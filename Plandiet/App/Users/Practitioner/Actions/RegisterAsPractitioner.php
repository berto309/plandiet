<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;
use App\Mail\NewPractitionerRegisteredMail;
use App\Mail\PractitionerRegistrationCompletedMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Fluent;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\UserRoleEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;

final class RegisterAsPractitioner
{
    public function register(array $data): void
    {
        $fluent = $this->getFluentData($data);

        $user = User::create([
            'name' => $fluent->step0->name,
            'email' => $fluent->step0->email,
            'phone' => $fluent->step0->phone,
            'gender' => $fluent->step0->gender,
            'date_of_birth' => $fluent->step0->date_of_birth,
            'password' => bcrypt($fluent->step0->password),
            'role' => UserRoleEnum::PRACTITIONER,
            'city' => $fluent->step0->city,
            'address' => $fluent->step0->address,
            'post_code' => $fluent->step0->post_code,
            'status' => UserStatusEnum::ACTIVE,
        ]);

        PractitionerProfile::create([
            'user_id' => $user->id,
            'professional_title' => $fluent->step1->professional_title,
            'credential_type' => ProfessionalTitleEnum::tryFrom($fluent->step1->professional_title)->getCredentialType(),
            'registration_number' => $fluent->step1->registration_number,
            'regulator' => $fluent->step1->regulator,
            'country_of_practice' =>  $fluent->step1->country_of_practice,
            'proof_of_identity' =>  $fluent->step1->proof_of_identity,
            'practice_name' =>  $fluent->step1->practice_name,
            'website' =>  $fluent->step1->website,
            'verification_status' => VerificationStatusEnum::UNDER_REVIEW
        ]);

        $user->addMedia($fluent->step2->proof_of_identity_file)
            ->addCustomHeaders([
                'ACL' => 'public-read'
            ])
            ->toMediaCollection('proof-of-identity');
        $user->addMedia($fluent->step2->proof_of_address)
            ->addCustomHeaders([
                'ACL' => 'public-read'
            ])
            ->toMediaCollection('proof-of-address');

        $user->addMedia($fluent->step2->qualification_certificate)
            ->addCustomHeaders([
                'ACL' => 'public-read'
            ])
            ->toMediaCollection('qualification-certificate');

        Mail::to($user->email)->send(new PractitionerRegistrationCompletedMail(practitionerName: $user->name));
        Mail::to($user->email)->send(new NewPractitionerRegisteredMail(practitionerId: $user->id, practitionerName: $user->name, practitionerEmail: $user->email, createdAt: $user->created_at->format('j F, Y H:i')));


    }


    function getFluentData(array $array): Fluent
    {
        return new Fluent(
            array_map(function ($value) {
                return is_array($value) ? $this->getFluentData($value) : $value;
            }, $array)
        );
    }
}
