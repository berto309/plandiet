<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;

final class UpdatePractitionerProfileInformation
{
    public function update(array $data): void
    {
        PractitionerProfile::where('user_id', auth()->id())->update($data);
    }
}
