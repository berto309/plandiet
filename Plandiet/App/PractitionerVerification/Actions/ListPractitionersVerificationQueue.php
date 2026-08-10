<?php declare(strict_types=1);


namespace Plandiet\App\PractitionerVerification\Actions;

use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

final class ListPractitionersVerificationQueue
{

    public function get(): LengthAwarePaginator
    {
        return  User::where('role', UserRoleEnum::PRACTITIONER)
            ->whereHas('practitionerProfile', fn ($query) =>
            $query->where('verification_status', VerificationStatusEnum::UNDER_REVIEW->value)
            )
            ->with(['practitionerProfile' => fn ($query) =>
            $query->select([
                'user_id',
                'professional_title',
                'verification_status',
                'registration_number',
                'created_at',
            ])
            ])
            ->paginate();

    }
}
