<?php declare(strict_types=1);


namespace Plandiet\App\Users\Client\Actions;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

final class ListClients
{

    public function get(): LengthAwarePaginator
    {
        return User::where('role', UserRoleEnum::CLIENT)->with('clientHealthProfile')->latest()->paginate();
    }
}
