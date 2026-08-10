<?php declare(strict_types=1);

namespace Plandiet\App\Users\Practitioner\Actions;


use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;

final class GetPractitionerProfile
{
    public function get(): PractitionerProfile
    {
        return PractitionerProfile::where('user_id', auth()->id())->first();
    }
}
