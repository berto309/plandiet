<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;
final class UpdatePractitionerProfile
{

    public function update(\App\Models\User $practitioner, array $data): void
    {
        $practitioner->update($data);
    }
}
