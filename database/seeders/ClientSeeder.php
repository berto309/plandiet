<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Plandiet\App\Meal\Enums\DietPrimaryGoalEnum;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $sarah = User::where('email', 'sarah@plandiet.com')->first();
        $amir  = User::where('email', 'amir@plandiet.com')->first();
        $clientRole = UserRoleEnum::CLIENT->value;
        $userActiveStatus = UserStatusEnum::ACTIVE->value;
        $female = GenderEnum::FEMALE->value;
        $male = GenderEnum::MALE->value;
        $weightLoss = DietPrimaryGoalEnum::WEIGHT_LOSS->value;


        $clients = [
            [
                'user' => [
                    'name'              => 'Fatima Al-Hassan',
                    'email'             => 'fatima@plandiet.com',
                    'phone'             => fake()->phoneNumber(),
                    'password'          => Hash::make('123456'),
                    'role'              => $clientRole,
                    'status'            => $userActiveStatus,
                    'email_verified_at' => now(),
                    'date_of_birth'     => '1982-04-15',
                    'gender'            => $female,
                ],
                'practitioner_id' => $sarah?->id,
                'health_profile' => [
                    'conditions'          => json_encode(['diabetes_t2']),
                    'allergies'           => json_encode(['nuts', 'peanuts']),
                    'intolerances'        => null,
                    'primary_goal'        => $weightLoss ,
                    'height_cm'           => 162.5,
                    'weight_kg'           => 78.0,
                    'activity_level'      => 2,
                    'target_calories'     => 1800,
                    'target_protein_g'    => 90,
                    'target_carbs_g'      => 180,
                    'target_fat_g'        => 60,
                    'target_fibre_g'      => 30,
                    'target_sodium_mg'    => 1500,
                    'cuisine_preferences' => json_encode(['mediterranean', 'middle eastern']),
//                    'dietary_preferences' => json_encode(['halal']),
                    'meals_per_day'       => '4',
                    'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name'              => 'Marcus Brown',
                    'email'             => 'marcus@plandiet.com',
                    'phone'             => fake()->phoneNumber(),
                    'password'          => Hash::make('123456'),
                    'role'              => $clientRole ,
                    'status'            => $userActiveStatus,
                    'email_verified_at' => now(),
                    'date_of_birth'     => '1986-09-22',
                    'gender'            => $male,
                ],
                'practitioner_id' => $sarah?->id,
                'health_profile' => [
                    'conditions'          => json_encode(['hypertension', 'hypercholesterolaemia']),
                    'allergies'           => null,
                    'intolerances'        => null,
                    'primary_goal'        => $weightLoss ,
                    'height_cm'           => 178.0,
                    'weight_kg'           => 92.0,
                    'activity_level'      => 3,
                    'target_calories'     => 70000,
                    'target_protein_g'    => 4000,
                    'target_carbs_g'      => 7000,
                    'target_fat_g'        => 2000,
                    'target_fibre_g'      => 1000,
                    'target_sodium_mg'    => 1900,
                    'cuisine_preferences' => json_encode(['ghanaian']),
//                    'dietary_preferences' => [],
                    'meals_per_day'       => '3',
                    'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name'              => 'Lin Wei',
                    'email'             => 'lin@plandiet.com',
                    'phone'             => fake()->phoneNumber(),
                    'password'          => Hash::make('123456'),
                    'role'              => $clientRole ,
                    'status'            => $userActiveStatus,
                    'email_verified_at' => now(),
                    'date_of_birth'     => '1990-11-03',
                    'gender'            => $female,
                ],
                'practitioner_id' => $amir?->id,
                'health_profile' => [
//                    'conditions'          => json_encode(['ckd']),
//                    'allergies'           => json_encode(['shellfish']),
//                    'intolerances'        => json_encode(['lactose']),
                    'primary_goal'        => 'management',
                    'height_cm'           => 158.0,
                    'weight_kg'           => 55.0,
                    'activity_level'      => 2,
                    'target_calories'     => 1700,
                    'target_protein_g'    => 50,
                    'target_carbs_g'      => 230,
                    'target_fat_g'        => 55,
                    'target_fibre_g'      => 25,
                    'target_sodium_mg'    => 1200,
                    'cuisine_preferences' => json_encode(['asian', 'japanese']),
                    'meals_per_day'       => '3',
                    'max_cooking_minutes' => 40,
                ],
            ],
        ];

        foreach ($clients as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['user']['email']],
                $data['user']
            );


            ClientHealthProfile::firstOrCreate(
                ['user_id' => $user->id],
                array_merge($data['health_profile'], ['user_id' => $user->id])
            );

            if ($data['practitioner_id']) {
                DB::table('practitioner_clients')->insert(
                  [
                      [
                          'practitioner_id' => $data['practitioner_id'],
                          'user_id'       => $user->id,

                          'status'      => $userActiveStatus,
                          'enrolled_at' => now()->subDays(rand(7, 60)),
                          'created_at'  => now()
                      ]
                  ]
                );
            }
        }
    }
}
