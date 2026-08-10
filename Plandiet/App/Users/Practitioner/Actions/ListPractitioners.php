<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

final class ListPractitioners
{

    public function get()
    {
        return User::where('role', UserRoleEnum::PRACTITIONER)->whereHas('practitionerProfile', fn ($query) =>
        $query->where('verification_status', '!=', VerificationStatusEnum::UNDER_REVIEW->value)
        )
            ->with(['practitionerProfile' => fn ($query) =>
            $query->select([
                'user_id',
                'professional_title',
                'verification_status',
                'registration_number',
                'created_at',
            ])])->latest()->paginate();
    }
}
