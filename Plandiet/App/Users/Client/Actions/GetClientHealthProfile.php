<?php declare(strict_types=1);

namespace Plandiet\App\Users\Client\Actions;


use Plandiet\App\Users\Client\Models\ClientHealthProfile;

final class GetClientHealthProfile
{
    public function get(): ClientHealthProfile
    {
        return ClientHealthProfile::where('client_id', auth()->id())->first();
    }
}
