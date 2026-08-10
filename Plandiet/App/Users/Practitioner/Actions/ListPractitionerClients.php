<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;


use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;

final class ListPractitionerClients
{

    public function get(): ?LengthAwarePaginator
    {
        return PractitionerClient::with([
                'user:id,name,email,phone' => [
                    'clientHealthProfile:conditions,user_id'
                ]
            ])->where('practitioner_id', auth()->id())
            ->orderByDesc('practitioner_clients.id')
            ->paginate();

    }
}
