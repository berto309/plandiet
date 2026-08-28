<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\App\Users\Practitioner\Enums\RegulatorEnum;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;

class PractitionerSeeder extends Seeder
{
    public function run(): void
    {
        $fake = Factory::create();

        $regDietician = ProfessionalTitleEnum::REGISTERED_DIETICIAN;
        $regNutrition = ProfessionalTitleEnum::REGISTERED_NUTRITIONIST;
        $admin = User::first();

        $practData = [
            [
                'name'              => 'Sarah Okonkwo',
                'email'             => 'sarah@plandiet.com',
                'phone'             => Arr::random(['07325654474', '07555658874']),
                'date_of_birth'     => now()->subYears(30),
                'password'          => Hash::make('123456'),
                'role'              => UserRoleEnum::PRACTITIONER->value,
                'status'            => UserStatusEnum::ACTIVE->value,
                'gender'            => GenderEnum::FEMALE->value,
                'email_verified_at' => now(),
            ],
            [
                'name'              => 'Dr. Amir Hassan',
                'email'             => 'amir@plandiet.com',
                'phone'             => Arr::random(['07325654236', '07555658532']),
                'date_of_birth'     => now()->subYears(30),
                'password'          => Hash::make('123456'),
                'role'              => UserRoleEnum::PRACTITIONER->value,
                'status'            => UserStatusEnum::ACTIVE->value,
                'gender'            => GenderEnum::MALE->value,
                'email_verified_at' => now(),
            ],
            [
                'name'              => 'Emma Clarke',
                'email'             => 'emma@plandiet.com',
                'phone'             =>  array_rand(['07325654000', '07225658874']),
                'date_of_birth'     => now()->subYears(44),
                'password'          => Hash::make('123456'),
                'role'              => UserRoleEnum::PRACTITIONER->value,
                'status'            => UserStatusEnum::ACTIVE->value,
                'gender'            => GenderEnum::FEMALE->value,
                'email_verified_at' => now(),
            ],
        ];

        $practitioners = [
            [
                'user' => [
                    'name'              => 'Sarah Okonkwo',
                    'email'             => 'sarah@plandiet.com',
                    'phone'             => Arr::random(['07325654400', '07555658634']),
                    'date_of_birth'     => now()->subYears(34),
                    'password'          => Hash::make('123456'),
                    'role'              => UserRoleEnum::PRACTITIONER->value,
                    'status'            => UserStatusEnum::ACTIVE->value,
                    'gender'            => GenderEnum::FEMALE->value,
                    'email_verified_at' => now(),
                ],

                'profile' => [
                    'professional_title'  => $regDietician,
                    'credential_type'     => $regNutrition->getCredentialType(),
                    'registration_number' => 'DT12345',
                    'regulator'           => RegulatorEnum::HCPC,
                    'country_of_practice' => 'GB',
                    'practice_name'       => 'Sarah Okonkwo Nutrition',
                    'bio'                 => 'Specialist in diabetes and cardiovascular nutrition with 8 years experience.',
                    'verification_status' => VerificationStatusEnum::VERIFIED->value,
                    'verified_at'         => now(),
                    'registration_expiry' => now()->addYear(),
                    'insurance_expiry'    => now()->addYear(),
                    'verified_by'             => $admin->id,

//                    'max_clients'         => 50,
                ],
            ],
            [
                'user' => [
                    'name'              => 'Dr. Amir Hassan',
                    'email'             => 'amir@plandiet.com',
                    'phone'             => Arr::random(['07325654432', '07555650074']),
                    'date_of_birth'     => now()->subYears(50),
                    'password'          => Hash::make('123456'),
                    'role'              => UserRoleEnum::PRACTITIONER->value,
                    'status'            => UserStatusEnum::ACTIVE->value,
                    'gender'            => GenderEnum::MALE->value,
                    'email_verified_at' => now(),
                ],
                'profile' => [
                    'professional_title'  => $regNutrition,
                    'credential_type'     => $regNutrition->getCredentialType(),
                    'registration_number' => 'NUT98765',
                    'regulator'           => RegulatorEnum::AFN,
                    'country_of_practice' => 'GB',
                    'practice_name'       => 'Hassan Clinical Nutrition',
                    'bio'                 => 'Specialises in renal nutrition and IBS management.',
                    'verification_status' => VerificationStatusEnum::VERIFIED->value,
                    'verified_at'         => now(),
                    'registration_expiry' => now()->addYear(),
                    'insurance_expiry'    => now()->addMonths(8),
                    'verified_by'             => $admin->id,
//                    'max_clients'         => 30,
                ],
            ],
            [
                'user' => [
                    'name'              => 'Emma Clarke',
                    'email'             => 'emma@plandiet.com',
                    'phone'             =>  Arr::random(['07325654100', '07555658400']),
                    'date_of_birth'     => now()->subYears(53),
                    'password'          => Hash::make('123456'),
                    'role'              => UserRoleEnum::PRACTITIONER->value,
                    'status'            => UserStatusEnum::ACTIVE->value,
                    'gender'            => GenderEnum::FEMALE->value,
                    'email_verified_at' => now(),
                ],
                'profile' => [
                    'professional_title'  => ProfessionalTitleEnum::REGISTERED_DIETICIAN,
                    'credential_type'     => 'RD',
                    'registration_number' => 'DT55432',
                    'regulator'           => RegulatorEnum::HCPC,
                    'country_of_practice' => 'GB',
                    'practice_name'       => 'Emma Dietician Clinic',
                    'verification_status' => VerificationStatusEnum::UNDER_REVIEW->value,
                    'registration_expiry' => now()->addYear(),
                    'insurance_expiry'    => now()->addYear(),
//                    'max_clients'         => 20,
                ],
            ],
        ];

        foreach ($practitioners as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['user']['email']],
                $data['user']
            );

            PractitionerProfile::firstOrCreate(
                ['user_id' => $user->id],
                array_merge($data['profile'], ['user_id' => $user->id])
            );
        }
    }
}
