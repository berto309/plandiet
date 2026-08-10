<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;

final class GetPractitionerClientsList
{
    public function list(): array
    {
        return  PractitionerClient::with([
            'user:id,name,email,phone' => [
                'clientHealthProfile:conditions,user_id'
            ]
        ])->where('practitioner_id', auth()->id())
            ->orderByDesc('practitioner_clients.id')
            ->get()
            ->toArray();
    }
}
