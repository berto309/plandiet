<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Plandiet\App\Meal\Enums\DietPrimaryGoalEnum;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;
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

        $clients = $this->clientData($sarah?->id, $amir?->id);

        foreach ($clients as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['user']['email']],
                $data['user']
            );

            ClientHealthProfile::firstOrCreate(
                ['user_id' => $user->id],
                array_merge($data['health_profile']), ['user_id' => $user->id]
            );

            if ($data['practitioner_id']) {
                PractitionerClient::firstOrCreate(
                    [
                        'practitioner_id' => $data['practitioner_id'],
                        'user_id'       => $user->id,
                    ],
                    [
                        'status'      => 'active',
                        'enrolled_at' => now()->subDays(rand(7, 120)),
                    ]
                );
            }
        }
    }

    // ─── Client data ──────────────────────────────────────────────────────────

    private function clientData(?int $sarahId, ?int $amirId): array
    {
        $pw = Hash::make('123456');

        return [


            // ══════════════════════════════════════════════════════════════════
            // TYPE 2 DIABETES (T2DM) — clients
            // ══════════════════════════════════════════════════════════════════
            [
                'user' => [
                    'name' => 'Fatima Al-Hassan', 'email' => 'fatima@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1982-04-15', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['nuts', 'peanuts']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 162.5, 'weight_kg' => 78.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 180,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['Mediterranean', 'Middle Eastern']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Priya Sharma', 'email' => 'priya.sharma@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1975-06-18', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 160.0, 'weight_kg' => 74.5, 'activity_level' => 2,
                    'target_calories' => 1750, 'target_protein_g' => 85, 'target_carbs_g' => 160,
                    'target_fat_g' => 58, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Indian', 'South Asian']),
                    'dietary_preferences' => json_encode(['vegetarian']), 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'David Okafor', 'email' => 'david.okafor@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1968-02-11', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 174.0, 'weight_kg' => 95.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 110, 'target_carbs_g' => 200,
                    'target_fat_g' => 65, 'target_fibre_g' => 35, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Maria Santos', 'email' => 'maria.santos@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1971-09-30', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['fish']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 155.0, 'weight_kg' => 82.0, 'activity_level' => 2,
                    'target_calories' => 1650, 'target_protein_g' => 80, 'target_carbs_g' => 155,
                    'target_fat_g' => 55, 'target_fibre_g' => 30, 'target_sodium_mg' => 1600,
                    'cuisine_preferences' => json_encode(['Latin American', 'Spanish']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'James Whitfield', 'email' => 'james.whitfield@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1963-12-05', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 180.0, 'weight_kg' => 102.0, 'activity_level' => 1,
                    'target_calories' => 2100, 'target_protein_g' => 115, 'target_carbs_g' => 210,
                    'target_fat_g' => 65, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Aisha Mohammed', 'email' => 'aisha.mohammed@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1979-07-22', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['eggs']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 163.0, 'weight_kg' => 70.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 170,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(value: ['Middle Eastern', 'North African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '4', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Robert Chen', 'email' => 'robert.chen@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1958-03-14', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 170.0, 'weight_kg' => 80.0, 'activity_level' => 2,
                    'target_calories' => 1850, 'target_protein_g' => 55, 'target_carbs_g' => 230,
                    'target_fat_g' => 58, 'target_fibre_g' => 28, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Chinese', 'Asian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Sarah Patel', 'email' => 'sarah.patel@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1985-01-28', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['nuts']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'weight_loss',
                    'height_cm' => 157.0, 'weight_kg' => 68.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 165,
                    'target_fat_g' => 57, 'target_fibre_g' => 28, 'target_sodium_mg' => 1600,
                    'cuisine_preferences' => json_encode(['Indian', 'British']),
                    'dietary_preferences' => json_encode(['vegetarian']), 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Thomas Adeyemi', 'email' => 'thomas.adeyemi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1972-05-09', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 176.0, 'weight_kg' => 88.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 190,
                    'target_fat_g' => 65, 'target_fibre_g' => 32, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 50,
                ],
            ],
            [
                'user' => [
                    'name' => 'Claire Dubois', 'email' => 'claire.dubois@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1980-08-17', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 164.0, 'weight_kg' => 75.5, 'activity_level' => 2,
                    'target_calories' => 1750, 'target_protein_g' => 88, 'target_carbs_g' => 170,
                    'target_fat_g' => 58, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['French', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ahmed Khalil', 'email' => 'ahmed.khalil@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1965-11-23', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypercholesterolaemia']), 'allergies' => json_encode(['shellfish']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 172.0, 'weight_kg' => 98.0, 'activity_level' => 1,
                    'target_calories' => 2050, 'target_protein_g' => 105, 'target_carbs_g' => 205,
                    'target_fat_g' => 65, 'target_fibre_g' => 32, 'target_sodium_mg' => 1600,
                    'cuisine_preferences' => json_encode(['Egyptian', 'Middle Eastern']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Yuki Tanaka', 'email' => 'yuki.tanaka@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1977-04-02', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 155.0, 'weight_kg' => 65.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 82, 'target_carbs_g' => 165,
                    'target_fat_g' => 56, 'target_fibre_g' => 28, 'target_sodium_mg' => 1600,
                    'cuisine_preferences' => json_encode(['Japanese', 'Korean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Peter Kowalski', 'email' => 'peter.kowalski@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1961-07-19', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 182.0, 'weight_kg' => 105.0, 'activity_level' => 2,
                    'target_calories' => 2200, 'target_protein_g' => 120, 'target_carbs_g' => 220,
                    'target_fat_g' => 72, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Polish', 'Eastern European', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nadia Rahman', 'email' => 'nadia.rahman@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1988-10-14', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['nuts', 'sesame']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 162.0, 'weight_kg' => 71.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 88, 'target_carbs_g' => 175,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Bangladeshi', 'South Asian']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '4', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Carlos Mendez', 'email' => 'carlos.mendez@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1970-01-31', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 175.0, 'weight_kg' => 98.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 195,
                    'target_fat_g' => 65, 'target_fibre_g' => 30, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['Mexican', 'Latin American']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // HYPERTENSION — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Marcus Brown', 'email' => 'marcus@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1986-09-22', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 178.0, 'weight_kg' => 92.0, 'activity_level' => 3,
                    'target_calories' => 1900, 'target_protein_g' => 100, 'target_carbs_g' => 220,
                    'target_fat_g' => 65, 'target_fibre_g' => 30, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['West African', 'Caribbean', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Patricia Williams', 'email' => 'patricia.williams@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1959-03-27', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 167.0, 'weight_kg' => 83.0, 'activity_level' => 2,
                    'target_calories' => 1900, 'target_protein_g' => 95, 'target_carbs_g' => 220,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['British', 'Caribbean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Emmanuel Asante', 'email' => 'emmanuel.asante@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1966-06-15', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 179.0, 'weight_kg' => 96.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 230,
                    'target_fat_g' => 65, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 50,
                ],
            ],
            [
                'user' => [
                    'name' => 'Helen Papadopoulos', 'email' => 'helen.papadopoulos@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1974-02-08', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 161.0, 'weight_kg' => 72.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 210,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1300,
                    'cuisine_preferences' => json_encode(['Greek', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Michael Osei', 'email' => 'michael.osei@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1977-11-29', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => json_encode(['peanuts']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 176.0, 'weight_kg' => 100.0, 'activity_level' => 2,
                    'target_calories' => 2050, 'target_protein_g' => 110, 'target_carbs_g' => 235,
                    'target_fat_g' => 67, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Fatou Diallo', 'email' => 'fatou.diallo@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1983-07-04', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 165.0, 'weight_kg' => 79.0, 'activity_level' => 2,
                    'target_calories' => 1850, 'target_protein_g' => 92, 'target_carbs_g' => 215,
                    'target_fat_g' => 62, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Senegalese', 'West African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Derek Thompson', 'email' => 'derek.thompson@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1956-04-16', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 178.0, 'weight_kg' => 94.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 225,
                    'target_fat_g' => 65, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['British', 'American']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Amara Diop', 'email' => 'amara.diop@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1969-09-11', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 182.0, 'weight_kg' => 89.0, 'activity_level' => 3,
                    'target_calories' => 2100, 'target_protein_g' => 110, 'target_carbs_g' => 240,
                    'target_fat_g' => 68, 'target_fibre_g' => 33, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['Ivorian', 'West African', 'French']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Susan Mitchell', 'email' => 'susan.mitchell@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1962-01-25', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 163.0, 'weight_kg' => 77.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 210,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kwame Mensah', 'email' => 'kwame.mensah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1975-12-07', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 177.0, 'weight_kg' => 93.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 200,
                    'target_fat_g' => 65, 'target_fibre_g' => 33, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Caribbean', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Isabelle Laurent', 'email' => 'isabelle.laurent@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1981-05-20', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => json_encode(['fish']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 166.0, 'weight_kg' => 76.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 205,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['French', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Abdul Noor', 'email' => 'abdul.noor@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1967-08-13', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 173.0, 'weight_kg' => 97.0, 'activity_level' => 1,
                    'target_calories' => 2000, 'target_protein_g' => 100, 'target_carbs_g' => 200,
                    'target_fat_g' => 65, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Pakistani', 'South Asian']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // HYPERCHOLESTEROLAEMIA — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Olivia Henderson', 'email' => 'olivia.henderson@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1978-10-05', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 168.0, 'weight_kg' => 70.0, 'activity_level' => 3,
                    'target_calories' => 1850, 'target_protein_g' => 92, 'target_carbs_g' => 215,
                    'target_fat_g' => 55, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Frank Nwosu', 'email' => 'frank.nwosu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1964-04-18', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 175.0, 'weight_kg' => 91.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 220,
                    'target_fat_g' => 58, 'target_fibre_g' => 35, 'target_sodium_mg' => 1500,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Mei Lin Zhang', 'email' => 'mei.zhang@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1983-12-24', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 158.0, 'weight_kg' => 58.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 200,
                    'target_fat_g' => 52, 'target_fibre_g' => 33, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Chinese', 'Asian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Graham Ellis', 'email' => 'graham.ellis@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1957-08-30', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 181.0, 'weight_kg' => 88.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 225,
                    'target_fat_g' => 60, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['British', 'Italian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Samira Hassan', 'email' => 'samira.hassan@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1980-03-13', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => json_encode(['nuts']),
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 162.0, 'weight_kg' => 68.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 210,
                    'target_fat_g' => 56, 'target_fibre_g' => 34, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Somali', 'East African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Oliver Burke', 'email' => 'oliver.burke@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1973-06-01', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 179.0, 'weight_kg' => 96.0, 'activity_level' => 2,
                    'target_calories' => 2050, 'target_protein_g' => 108, 'target_carbs_g' => 210,
                    'target_fat_g' => 63, 'target_fibre_g' => 35, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Irish', 'British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nneka Eze', 'email' => 'nneka.eze@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1976-02-19', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 164.0, 'weight_kg' => 81.0, 'activity_level' => 2,
                    'target_calories' => 1900, 'target_protein_g' => 95, 'target_carbs_g' => 220,
                    'target_fat_g' => 60, 'target_fibre_g' => 35, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Igbo', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 50,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // CHRONIC KIDNEY DISEASE (CKD) — clients
            // ══════════════════════════════════════════════════════════════════
            [
                'user' => [
                    'name' => 'Lin Wei', 'email' => 'lin@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1990-11-03', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd']), 'allergies' => json_encode(['shellfish']),
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'management',
                    'height_cm' => 158.0, 'weight_kg' => 55.0, 'activity_level' => 2,
                    'target_calories' => 1700, 'target_protein_g' => 50, 'target_carbs_g' => 230,
                    'target_fat_g' => 55, 'target_fibre_g' => 25, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Asian', 'Japanese']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],

            [
                'user' => [
                    'name' => 'Margaret Davies', 'email' => 'margaret.davies@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1955-05-12', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 160.0, 'weight_kg' => 65.0, 'activity_level' => 1,
                    'target_calories' => 1700, 'target_protein_g' => 48, 'target_carbs_g' => 240,
                    'target_fat_g' => 55, 'target_fibre_g' => 22, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['British', 'Welsh']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Vikram Singh', 'email' => 'vikram.singh@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1960-09-04', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 173.0, 'weight_kg' => 75.0, 'activity_level' => 2,
                    'target_calories' => 1900, 'target_protein_g' => 55, 'target_carbs_g' => 255,
                    'target_fat_g' => 60, 'target_fibre_g' => 23, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Punjabi', 'South Asian']),
                    'dietary_preferences' => json_encode(['vegetarian']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Brenda Okonkwo', 'email' => 'brenda.okonkwo@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1958-11-16', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 161.0, 'weight_kg' => 70.0, 'activity_level' => 1,
                    'target_calories' => 1750, 'target_protein_g' => 50, 'target_carbs_g' => 240,
                    'target_fat_g' => 56, 'target_fibre_g' => 22, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Hideo Yamamoto', 'email' => 'hideo.yamamoto@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1954-01-07', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd']), 'allergies' => json_encode(['shellfish']),
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 168.0, 'weight_kg' => 62.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 50, 'target_carbs_g' => 250,
                    'target_fat_g' => 57, 'target_fibre_g' => 22, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Japanese', 'Asian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Rose Oduya', 'email' => 'rose.oduya@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1963-03-29', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'hypertension']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'management',
                    'height_cm' => 157.0, 'weight_kg' => 63.0, 'activity_level' => 2,
                    'target_calories' => 1700, 'target_protein_g' => 48, 'target_carbs_g' => 235,
                    'target_fat_g' => 54, 'target_fibre_g' => 22, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'John Eriksson', 'email' => 'john.eriksson@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1949-07-21', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 176.0, 'weight_kg' => 78.0, 'activity_level' => 1,
                    'target_calories' => 1850, 'target_protein_g' => 52, 'target_carbs_g' => 252,
                    'target_fat_g' => 55, 'target_fibre_g' => 22, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Scandinavian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Miriam Okello', 'email' => 'miriam.okello@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1966-10-08', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd']), 'allergies' => json_encode(['eggs']),
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 162.0, 'weight_kg' => 60.0, 'activity_level' => 2,
                    'target_calories' => 1720, 'target_protein_g' => 50, 'target_carbs_g' => 240,
                    'target_fat_g' => 54, 'target_fibre_g' => 22, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Ugandan', 'East African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // IBS / GASTROINTESTINAL — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Sophie Tremblay', 'email' => 'sophie.tremblay@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1992-04-26', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose', 'gluten']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 165.0, 'weight_kg' => 60.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 195,
                    'target_fat_g' => 57, 'target_fibre_g' => 25, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['French', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Daniel Park', 'email' => 'daniel.park@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1987-08-03', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 174.0, 'weight_kg' => 72.0, 'activity_level' => 4,
                    'target_calories' => 1900, 'target_protein_g' => 100, 'target_carbs_g' => 210,
                    'target_fat_g' => 63, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Korean', 'Japanese', 'Asian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Harriet Osei-Bonsu', 'email' => 'harriet.osei@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1984-02-15', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 166.0, 'weight_kg' => 67.0, 'activity_level' => 3,
                    'target_calories' => 1780, 'target_protein_g' => 88, 'target_carbs_g' => 200,
                    'target_fat_g' => 60, 'target_fibre_g' => 23, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Leo Fitzgerald', 'email' => 'leo.fitzgerald@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1994-11-22', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'symptom_management',
                    'height_cm' => 178.0, 'weight_kg' => 76.0, 'activity_level' => 4,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 220,
                    'target_fat_g' => 66, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Irish', 'British', 'Italian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Amina Touré', 'email' => 'amina.toure@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1990-06-08', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 163.0, 'weight_kg' => 61.0, 'activity_level' => 3,
                    'target_calories' => 1720, 'target_protein_g' => 85, 'target_carbs_g' => 198,
                    'target_fat_g' => 58, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Malian', 'West African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'William Blackwood', 'email' => 'william.blackwood@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1978-09-14', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => json_encode(['gluten', 'lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 180.0, 'weight_kg' => 84.0, 'activity_level' => 3,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 220,
                    'target_fat_g' => 58, 'target_fibre_g' => 23, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Chidinma Eze', 'email' => 'chidinma.eze@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1996-01-19', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => json_encode(['eggs']),
                    'intolerances' => null, 'primary_goal' => 'symptom_management',
                    'height_cm' => 161.0, 'weight_kg' => 58.0, 'activity_level' => 3,
                    'target_calories' => 1680, 'target_protein_g' => 83, 'target_carbs_g' => 195,
                    'target_fat_g' => 56, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ryan Murphy', 'email' => 'ryan.murphy@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1991-04-30', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 176.0, 'weight_kg' => 79.0, 'activity_level' => 4,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 215,
                    'target_fat_g' => 65, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Irish', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // NUT / PEANUT ALLERGY — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Layla Abdullah', 'email' => 'layla.abdullah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1995-02-14', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['nuts', 'peanuts', 'sesame']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 164.0, 'weight_kg' => 72.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 195,
                    'target_fat_g' => 57, 'target_fibre_g' => 27, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Lebanese', 'Middle Eastern']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ben Carpenter', 'email' => 'ben.carpenter@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1989-07-11', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['peanuts', 'tree_nuts']),
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 181.0, 'weight_kg' => 82.0, 'activity_level' => 4,
                    'target_calories' => 2100, 'target_protein_g' => 110, 'target_carbs_g' => 240,
                    'target_fat_g' => 70, 'target_fibre_g' => 30, 'target_sodium_mg' => 2300,
                    'cuisine_preferences' => json_encode(['British', 'American']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Zara Ahmed', 'email' => 'zara.ahmed@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1993-12-01', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['peanuts']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 160.0, 'weight_kg' => 69.0, 'activity_level' => 3,
                    'target_calories' => 1750, 'target_protein_g' => 87, 'target_carbs_g' => 170,
                    'target_fat_g' => 58, 'target_fibre_g' => 30, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Pakistani', 'Indian']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ellie Boateng', 'email' => 'ellie.boateng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1997-03-22', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['nuts', 'peanuts']),
                    'intolerances' => null, 'primary_goal' => 'weight_gain',
                    'height_cm' => 169.0, 'weight_kg' => 52.0, 'activity_level' => 4,
                    'target_calories' => 2100, 'target_protein_g' => 110, 'target_carbs_g' => 270,
                    'target_fat_g' => 70, 'target_fibre_g' => 28, 'target_sodium_mg' => 2300,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kieran Walsh', 'email' => 'kieran.walsh@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1986-05-17', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => json_encode(['nuts']),
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 177.0, 'weight_kg' => 85.0, 'activity_level' => 3,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 220,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Irish', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Funmilayo Bello', 'email' => 'funmilayo.bello@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1982-10-08', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['peanuts', 'shellfish']),
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 163.0, 'weight_kg' => 68.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 210,
                    'target_fat_g' => 60, 'target_fibre_g' => 28, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // GLUTEN INTOLERANCE / COELIAC — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Caitlin O\'Brien', 'email' => 'caitlin.obrien@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1988-09-06', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'general_health',
                    'height_cm' => 167.0, 'weight_kg' => 63.0, 'activity_level' => 3,
                    'target_calories' => 1750, 'target_protein_g' => 88, 'target_carbs_g' => 200,
                    'target_fat_g' => 58, 'target_fibre_g' => 25, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Irish', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Tobias Neumann', 'email' => 'tobias.neumann@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1983-12-12', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 179.0, 'weight_kg' => 87.0, 'activity_level' => 3,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 180,
                    'target_fat_g' => 65, 'target_fibre_g' => 27, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['German', 'European']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Adaeze Nwachukwu', 'email' => 'adaeze.nwachukwu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1991-04-04', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten', 'lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 162.0, 'weight_kg' => 60.0, 'activity_level' => 3,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 195,
                    'target_fat_g' => 57, 'target_fibre_g' => 24, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Jack Morrison', 'email' => 'jack.morrison@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1976-07-28', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 175.0, 'weight_kg' => 84.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 210,
                    'target_fat_g' => 57, 'target_fibre_g' => 33, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['British', 'Italian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Blessing Chukwu', 'email' => 'blessing.chukwu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1985-11-15', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'weight_loss',
                    'height_cm' => 164.0, 'weight_kg' => 75.0, 'activity_level' => 3,
                    'target_calories' => 1720, 'target_protein_g' => 86, 'target_carbs_g' => 195,
                    'target_fat_g' => 58, 'target_fibre_g' => 26, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Nigerian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // VEGAN / PLANT-BASED — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Jade Thompson', 'email' => 'jade.thompson@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1994-08-09', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 169.0, 'weight_kg' => 63.0, 'activity_level' => 4,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 215,
                    'target_fat_g' => 55, 'target_fibre_g' => 38, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['British', 'Asian', 'Mediterranean']),
                    'dietary_preferences' => json_encode(['vegan']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kofi Agyemang', 'email' => 'kofi.agyemang@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1987-03-31', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 178.0, 'weight_kg' => 80.0, 'activity_level' => 4,
                    'target_calories' => 2050, 'target_protein_g' => 105, 'target_carbs_g' => 250,
                    'target_fat_g' => 62, 'target_fibre_g' => 40, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => json_encode(['vegan']), 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Anya Petrov', 'email' => 'anya.petrov@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1990-12-05', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['nuts']),
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 164.0, 'weight_kg' => 58.0, 'activity_level' => 4,
                    'target_calories' => 1750, 'target_protein_g' => 88, 'target_carbs_g' => 215,
                    'target_fat_g' => 58, 'target_fibre_g' => 38, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Russian', 'Eastern European']),
                    'dietary_preferences' => json_encode(['vegan']), 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Abiola Adeyemi', 'email' => 'abiola.adeyemi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1992-06-25', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 161.0, 'weight_kg' => 66.0, 'activity_level' => 3,
                    'target_calories' => 1750, 'target_protein_g' => 88, 'target_carbs_g' => 170,
                    'target_fat_g' => 58, 'target_fibre_g' => 38, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => json_encode(['vegan']), 'meals_per_day' => '4', 'max_cooking_minutes' => 40,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // WEIGHT MANAGEMENT / GENERAL HEALTH — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Natasha Ivanova', 'email' => 'natasha.ivanova@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1986-09-19', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 170.0, 'weight_kg' => 88.0, 'activity_level' => 2,
                    'target_calories' => 1600, 'target_protein_g' => 95, 'target_carbs_g' => 175,
                    'target_fat_g' => 52, 'target_fibre_g' => 30, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Russian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Chukwuemeka Ojo', 'email' => 'chukwuemeka.ojo@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1979-02-28', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 180.0, 'weight_kg' => 115.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 130, 'target_carbs_g' => 200,
                    'target_fat_g' => 65, 'target_fibre_g' => 35, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Nigerian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ingrid Larsson', 'email' => 'ingrid.larsson@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1984-06-12', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 172.0, 'weight_kg' => 68.0, 'activity_level' => 4,
                    'target_calories' => 1900, 'target_protein_g' => 95, 'target_carbs_g' => 225,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 2200,
                    'cuisine_preferences' => json_encode(['Scandinavian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nnamdi Chukwu', 'email' => 'nnamdi.chukwu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1973-11-07', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 179.0, 'weight_kg' => 108.0, 'activity_level' => 1,
                    'target_calories' => 2100, 'target_protein_g' => 120, 'target_carbs_g' => 210,
                    'target_fat_g' => 68, 'target_fibre_g' => 32, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Igbo', 'West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Esme Fontaine', 'email' => 'esme.fontaine@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1997-05-03', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'weight_gain',
                    'height_cm' => 165.0, 'weight_kg' => 50.0, 'activity_level' => 4,
                    'target_calories' => 2200, 'target_protein_g' => 115, 'target_carbs_g' => 275,
                    'target_fat_g' => 73, 'target_fibre_g' => 28, 'target_sodium_mg' => 2300,
                    'cuisine_preferences' => json_encode(['French', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ibrahim Al-Farsi', 'email' => 'ibrahim.alfarsi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1983-01-16', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 176.0, 'weight_kg' => 80.0, 'activity_level' => 3,
                    'target_calories' => 2100, 'target_protein_g' => 110, 'target_carbs_g' => 245,
                    'target_fat_g' => 70, 'target_fibre_g' => 30, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Emirati', 'Middle Eastern']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Patience Kwarteng', 'email' => 'patience.kwarteng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1968-08-24', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 163.0, 'weight_kg' => 92.0, 'activity_level' => 2,
                    'target_calories' => 1700, 'target_protein_g' => 100, 'target_carbs_g' => 190,
                    'target_fat_g' => 55, 'target_fibre_g' => 30, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Tom Higgins', 'email' => 'tom.higgins@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1980-04-14', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 183.0, 'weight_kg' => 110.0, 'activity_level' => 2,
                    'target_calories' => 2100, 'target_protein_g' => 130, 'target_carbs_g' => 210,
                    'target_fat_g' => 68, 'target_fibre_g' => 32, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['British', 'Italian']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Zainab Idris', 'email' => 'zainab.idris@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1995-07-30', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 162.0, 'weight_kg' => 78.0, 'activity_level' => 3,
                    'target_calories' => 1650, 'target_protein_g' => 90, 'target_carbs_g' => 190,
                    'target_fat_g' => 54, 'target_fibre_g' => 28, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Hausa', 'West African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Caleb Osei', 'email' => 'caleb.osei@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1993-02-10', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 176.0, 'weight_kg' => 76.0, 'activity_level' => 5,
                    'target_calories' => 2400, 'target_protein_g' => 150, 'target_carbs_g' => 280,
                    'target_fat_g' => 78, 'target_fibre_g' => 32, 'target_sodium_mg' => 2500,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'American']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // COMPLEX / MULTI-COMORBIDITY — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Elizabeth Chambers', 'email' => 'elizabeth.chambers@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1952-04-03', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension', 'hypercholesterolaemia']),
                    'allergies' => null, 'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 159.0, 'weight_kg' => 76.0, 'activity_level' => 1,
                    'target_calories' => 1700, 'target_protein_g' => 85, 'target_carbs_g' => 170,
                    'target_fat_g' => 53, 'target_fibre_g' => 35, 'target_sodium_mg' => 1300,
                    'cuisine_preferences' => json_encode(['British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Babajide Adebayo', 'email' => 'babajide.adebayo@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1960-06-19', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension', 'ckd']),
                    'allergies' => null, 'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 172.0, 'weight_kg' => 82.0, 'activity_level' => 1,
                    'target_calories' => 1800, 'target_protein_g' => 52, 'target_carbs_g' => 200,
                    'target_fat_g' => 58, 'target_fibre_g' => 25, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Florence Addo', 'email' => 'florence.addo@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1957-01-11', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'ckd', 'hypercholesterolaemia']),
                    'allergies' => null, 'intolerances' => json_encode(['lactose']), 'primary_goal' => 'management',
                    'height_cm' => 158.0, 'weight_kg' => 68.0, 'activity_level' => 1,
                    'target_calories' => 1700, 'target_protein_g' => 50, 'target_carbs_g' => 230,
                    'target_fat_g' => 52, 'target_fibre_g' => 24, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Harold Winterbottom', 'email' => 'harold.winterbottom@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1948-09-28', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'ckd', 'hypercholesterolaemia']),
                    'allergies' => null, 'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 174.0, 'weight_kg' => 78.0, 'activity_level' => 1,
                    'target_calories' => 1800, 'target_protein_g' => 50, 'target_carbs_g' => 205,
                    'target_fat_g' => 55, 'target_fibre_g' => 24, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 20,
                ],
            ],
            [
                'user' => [
                    'name' => 'Amara Kone', 'email' => 'amara.kone@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1962-12-04', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']),
                    'allergies' => json_encode(['shellfish']), 'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 175.0, 'weight_kg' => 90.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 220,
                    'target_fat_g' => 60, 'target_fibre_g' => 33, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Burkinabe', 'West African']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Rebecca Nartey', 'email' => 'rebecca.nartey@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1970-07-17', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']),
                    'allergies' => json_encode(['nuts', 'eggs']), 'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 160.0, 'weight_kg' => 82.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 175,
                    'target_fat_g' => 58, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Segun Adeleke', 'email' => 'segun.adeleke@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1974-10-21', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypercholesterolaemia']),
                    'allergies' => null, 'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 177.0, 'weight_kg' => 95.0, 'activity_level' => 2,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 195,
                    'target_fat_g' => 60, 'target_fibre_g' => 35, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Cecilia Nkosi', 'email' => 'cecilia.nkosi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1965-03-06', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']),
                    'allergies' => null, 'intolerances' => json_encode(['gluten']), 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 161.0, 'weight_kg' => 78.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 180,
                    'target_fat_g' => 58, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Zulu', 'Southern African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Emmanuel Owusu', 'email' => 'emmanuel.owusu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1956-11-30', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'diabetes_t2', 'hypertension']),
                    'allergies' => null, 'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 170.0, 'weight_kg' => 73.0, 'activity_level' => 1,
                    'target_calories' => 1780, 'target_protein_g' => 50, 'target_carbs_g' => 220,
                    'target_fat_g' => 55, 'target_fibre_g' => 22, 'target_sodium_mg' => 1000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Adwoa Asare', 'email' => 'adwoa.asare@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1979-05-27', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs', 'hypertension']),
                    'allergies' => json_encode(['nuts']), 'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 163.0, 'weight_kg' => 74.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 210,
                    'target_fat_g' => 58, 'target_fibre_g' => 25, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Joseph Asante-Darko', 'email' => 'joseph.asante@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1969-08-05', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'ibs']),
                    'allergies' => null, 'intolerances' => json_encode(['gluten']), 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 175.0, 'weight_kg' => 88.0, 'activity_level' => 2,
                    'target_calories' => 1900, 'target_protein_g' => 98, 'target_carbs_g' => 185,
                    'target_fat_g' => 62, 'target_fibre_g' => 26, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Caribbean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Abena Ofori', 'email' => 'abena.ofori@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1988-03-18', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']),
                    'allergies' => json_encode(['shellfish', 'fish']), 'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 161.0, 'weight_kg' => 70.0, 'activity_level' => 3,
                    'target_calories' => 1780, 'target_protein_g' => 88, 'target_carbs_g' => 210,
                    'target_fat_g' => 55, 'target_fibre_g' => 34, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],

            // ══════════════════════════════════════════════════════════════════
            // ADDITIONAL DIVERSITY — clients
            // ══════════════════════════════════════════════════════════════════

            [
                'user' => [
                    'name' => 'Kolade Babatunde', 'email' => 'kolade.babatunde@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1982-11-14', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 180.0, 'weight_kg' => 93.0, 'activity_level' => 3,
                    'target_calories' => 2000, 'target_protein_g' => 105, 'target_carbs_g' => 230,
                    'target_fat_g' => 65, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Amaka Ezeji', 'email' => 'amaka.ezeji@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1986-07-02', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => json_encode(['peanuts']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 163.0, 'weight_kg' => 74.0, 'activity_level' => 2,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 175,
                    'target_fat_g' => 60, 'target_fibre_g' => 30, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Igbo', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Mustafa Ozturk', 'email' => 'mustafa.ozturk@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1975-04-10', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 177.0, 'weight_kg' => 94.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 195,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Turkish', 'Mediterranean']),
                    'dietary_preferences' => json_encode(['halal']), 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Iyabo Balogun', 'email' => 'iyabo.balogun@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1973-09-26', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 160.0, 'weight_kg' => 80.0, 'activity_level' => 2,
                    'target_calories' => 1850, 'target_protein_g' => 93, 'target_carbs_g' => 185,
                    'target_fat_g' => 57, 'target_fibre_g' => 35, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Hamish MacLeod', 'email' => 'hamish.macleod@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1967-02-22', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 183.0, 'weight_kg' => 98.0, 'activity_level' => 2,
                    'target_calories' => 2050, 'target_protein_g' => 108, 'target_carbs_g' => 225,
                    'target_fat_g' => 60, 'target_fibre_g' => 35, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Scottish', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Sade Afolabi', 'email' => 'sade.afolabi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1991-08-18', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => json_encode(['gluten']),
                    'intolerances' => json_encode(['gluten', 'lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 165.0, 'weight_kg' => 62.0, 'activity_level' => 3,
                    'target_calories' => 1750, 'target_protein_g' => 87, 'target_carbs_g' => 200,
                    'target_fat_g' => 58, 'target_fibre_g' => 23, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Yoruba', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kweku Antwi', 'email' => 'kweku.antwi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1977-12-31', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 175.0, 'weight_kg' => 89.0, 'activity_level' => 2,
                    'target_calories' => 1950, 'target_protein_g' => 100, 'target_carbs_g' => 190,
                    'target_fat_g' => 63, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Fante', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 45,
                ],
            ],
            [
                'user' => [
                    'name' => 'Charity Mensah-Bonsu', 'email' => 'charity.mensah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1984-05-16', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['eggs', 'nuts']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 162.0, 'weight_kg' => 80.0, 'activity_level' => 3,
                    'target_calories' => 1680, 'target_protein_g' => 92, 'target_carbs_g' => 190,
                    'target_fat_g' => 54, 'target_fibre_g' => 30, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Osei Bonsu', 'email' => 'osei.bonsu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1971-01-20', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 177.0, 'weight_kg' => 87.0, 'activity_level' => 2,
                    'target_calories' => 1970, 'target_protein_g' => 102, 'target_carbs_g' => 225,
                    'target_fat_g' => 60, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Caribbean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Abigail Oppong', 'email' => 'abigail.oppong@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1989-10-07', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 160.0, 'weight_kg' => 72.0, 'activity_level' => 3,
                    'target_calories' => 1780, 'target_protein_g' => 89, 'target_carbs_g' => 172,
                    'target_fat_g' => 59, 'target_fibre_g' => 30, 'target_sodium_mg' => 1600,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Akua Nyarko', 'email' => 'akua.nyarko@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1976-06-13', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 161.0, 'weight_kg' => 67.0, 'activity_level' => 2,
                    'target_calories' => 1720, 'target_protein_g' => 50, 'target_carbs_g' => 235,
                    'target_fat_g' => 54, 'target_fibre_g' => 23, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Yaw Amponsah', 'email' => 'yaw.amponsah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1963-04-29', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension', 'ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 171.0, 'weight_kg' => 76.0, 'activity_level' => 1,
                    'target_calories' => 1800, 'target_protein_g' => 50, 'target_carbs_g' => 215,
                    'target_fat_g' => 57, 'target_fibre_g' => 23, 'target_sodium_mg' => 1000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Comfort Darkwah', 'email' => 'comfort.darkwah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1980-02-05', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs', 'hypercholesterolaemia']), 'allergies' => json_encode(['nuts']),
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 162.0, 'weight_kg' => 69.0, 'activity_level' => 2,
                    'target_calories' => 1780, 'target_protein_g' => 89, 'target_carbs_g' => 205,
                    'target_fat_g' => 55, 'target_fibre_g' => 25, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Samuel Owiredu', 'email' => 'samuel.owiredu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1959-08-16', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 174.0, 'weight_kg' => 79.0, 'activity_level' => 1,
                    'target_calories' => 1850, 'target_protein_g' => 52, 'target_carbs_g' => 248,
                    'target_fat_g' => 55, 'target_fibre_g' => 23, 'target_sodium_mg' => 1200,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Theodora Amponsah', 'email' => 'theodora.amponsah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1993-05-28', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['shellfish', 'fish']),
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 168.0, 'weight_kg' => 65.0, 'activity_level' => 4,
                    'target_calories' => 1900, 'target_protein_g' => 95, 'target_carbs_g' => 225,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 2200,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kwabena Twumasi', 'email' => 'kwabena.twumasi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1968-03-11', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 176.0, 'weight_kg' => 91.0, 'activity_level' => 2,
                    'target_calories' => 1970, 'target_protein_g' => 100, 'target_carbs_g' => 195,
                    'target_fat_g' => 63, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Akan', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Mavis Darko', 'email' => 'mavis.darko@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1965-12-02', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 160.0, 'weight_kg' => 77.0, 'activity_level' => 2,
                    'target_calories' => 1860, 'target_protein_g' => 93, 'target_carbs_g' => 215,
                    'target_fat_g' => 57, 'target_fibre_g' => 35, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nana Ama Boateng', 'email' => 'nana.boateng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1998-09-14', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['peanuts']),
                    'intolerances' => null, 'primary_goal' => 'weight_gain',
                    'height_cm' => 165.0, 'weight_kg' => 49.0, 'activity_level' => 5,
                    'target_calories' => 2300, 'target_protein_g' => 120, 'target_carbs_g' => 290,
                    'target_fat_g' => 77, 'target_fibre_g' => 30, 'target_sodium_mg' => 2400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'American', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kwasi Prempeh', 'email' => 'kwasi.prempeh@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1955-06-06', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 171.0, 'weight_kg' => 71.0, 'activity_level' => 1,
                    'target_calories' => 1780, 'target_protein_g' => 50, 'target_carbs_g' => 225,
                    'target_fat_g' => 56, 'target_fibre_g' => 23, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Esi Boateng', 'email' => 'esi.boateng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1987-04-22', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => json_encode(['eggs']),
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 164.0, 'weight_kg' => 63.0, 'activity_level' => 3,
                    'target_calories' => 1750, 'target_protein_g' => 87, 'target_carbs_g' => 200,
                    'target_fat_g' => 58, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Fante', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Anthony Acheampong', 'email' => 'anthony.acheampong@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1974-11-08', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 178.0, 'weight_kg' => 89.0, 'activity_level' => 3,
                    'target_calories' => 1990, 'target_protein_g' => 103, 'target_carbs_g' => 228,
                    'target_fat_g' => 64, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Grace Asante', 'email' => 'grace.asante@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1960-07-19', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 158.0, 'weight_kg' => 74.0, 'activity_level' => 1,
                    'target_calories' => 1720, 'target_protein_g' => 86, 'target_carbs_g' => 170,
                    'target_fat_g' => 52, 'target_fibre_g' => 35, 'target_sodium_mg' => 1300,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Philip Mensah', 'email' => 'philip.mensah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1983-01-30', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['nuts', 'fish']),
                    'intolerances' => null, 'primary_goal' => 'general_health',
                    'height_cm' => 177.0, 'weight_kg' => 78.0, 'activity_level' => 4,
                    'target_calories' => 2150, 'target_protein_g' => 115, 'target_carbs_g' => 255,
                    'target_fat_g' => 70, 'target_fibre_g' => 30, 'target_sodium_mg' => 2200,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'American', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Perpetua Agyapong', 'email' => 'perpetua.agyapong@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1972-09-05', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => json_encode(['shellfish']),
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 163.0, 'weight_kg' => 73.0, 'activity_level' => 2,
                    'target_calories' => 1840, 'target_protein_g' => 92, 'target_carbs_g' => 215,
                    'target_fat_g' => 56, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Victor Amoah', 'email' => 'victor.amoah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1981-06-24', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 176.0, 'weight_kg' => 86.0, 'activity_level' => 3,
                    'target_calories' => 1920, 'target_protein_g' => 98, 'target_carbs_g' => 185,
                    'target_fat_g' => 63, 'target_fibre_g' => 30, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Abena Ankomah', 'email' => 'abena.ankomah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1994-03-09', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['peanuts', 'tree_nuts', 'sesame']),
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 167.0, 'weight_kg' => 79.0, 'activity_level' => 3,
                    'target_calories' => 1680, 'target_protein_g' => 92, 'target_carbs_g' => 192,
                    'target_fat_g' => 54, 'target_fibre_g' => 28, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kofi Boateng-Twumasi', 'email' => 'kofi.boateng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1966-10-17', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 173.0, 'weight_kg' => 90.0, 'activity_level' => 2,
                    'target_calories' => 1960, 'target_protein_g' => 100, 'target_carbs_g' => 195,
                    'target_fat_g' => 63, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Eunice Asiedu', 'email' => 'eunice.asiedu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1979-02-14', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose', 'gluten']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 161.0, 'weight_kg' => 71.0, 'activity_level' => 2,
                    'target_calories' => 1760, 'target_protein_g' => 88, 'target_carbs_g' => 175,
                    'target_fat_g' => 57, 'target_fibre_g' => 24, 'target_sodium_mg' => 1700,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'James Gyamfi', 'email' => 'james.gyamfi@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1958-07-08', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 172.0, 'weight_kg' => 70.0, 'activity_level' => 1,
                    'target_calories' => 1780, 'target_protein_g' => 49, 'target_carbs_g' => 242,
                    'target_fat_g' => 55, 'target_fibre_g' => 22, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Cynthia Owusu', 'email' => 'cynthia.owusu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1985-05-31', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia', 'hypertension']), 'allergies' => json_encode(['eggs']),
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 162.0, 'weight_kg' => 75.0, 'activity_level' => 3,
                    'target_calories' => 1850, 'target_protein_g' => 93, 'target_carbs_g' => 215,
                    'target_fat_g' => 57, 'target_fibre_g' => 35, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nana Kofi Yeboah', 'email' => 'nana.yeboah@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1953-11-25', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension', 'ckd']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'management',
                    'height_cm' => 170.0, 'weight_kg' => 72.0, 'activity_level' => 1,
                    'target_calories' => 1760, 'target_protein_g' => 50, 'target_carbs_g' => 210,
                    'target_fat_g' => 55, 'target_fibre_g' => 23, 'target_sodium_mg' => 1000,
                    'cuisine_preferences' => json_encode(['Akan', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Dorcas Adomako', 'email' => 'dorcas.adomako@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1990-08-12', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => json_encode(['nuts', 'peanuts', 'sesame']),
                    'intolerances' => json_encode(['gluten']), 'primary_goal' => 'general_health',
                    'height_cm' => 163.0, 'weight_kg' => 60.0, 'activity_level' => 4,
                    'target_calories' => 1900, 'target_protein_g' => 95, 'target_carbs_g' => 220,
                    'target_fat_g' => 63, 'target_fibre_g' => 26, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kingsley Frimpong', 'email' => 'kingsley.frimpong@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1978-04-06', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_loss',
                    'height_cm' => 179.0, 'weight_kg' => 102.0, 'activity_level' => 2,
                    'target_calories' => 2050, 'target_protein_g' => 115, 'target_carbs_g' => 225,
                    'target_fat_g' => 66, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Josephine Bonsu', 'email' => 'josephine.bonsu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1963-01-17', 'gender' => 'female',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['ckd', 'diabetes_t2']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 158.0, 'weight_kg' => 64.0, 'activity_level' => 1,
                    'target_calories' => 1720, 'target_protein_g' => 50, 'target_carbs_g' => 230,
                    'target_fat_g' => 54, 'target_fibre_g' => 23, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Daniel Appiagyei', 'email' => 'daniel.appiagyei@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1997-07-21', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => null, 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'weight_gain',
                    'height_cm' => 178.0, 'weight_kg' => 58.0, 'activity_level' => 5,
                    'target_calories' => 2600, 'target_protein_g' => 160, 'target_carbs_g' => 320,
                    'target_fat_g' => 85, 'target_fibre_g' => 32, 'target_sodium_mg' => 2500,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'American']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 25,
                ],
            ],
            [
                'user' => [
                    'name' => 'Mary Asante-Boateng', 'email' => 'mary.asanteboateng@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1976-03-01', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'blood_pressure_control',
                    'height_cm' => 160.0, 'weight_kg' => 80.0, 'activity_level' => 2,
                    'target_calories' => 1880, 'target_protein_g' => 94, 'target_carbs_g' => 218,
                    'target_fat_g' => 58, 'target_fibre_g' => 35, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Stephen Tetteh', 'email' => 'stephen.tetteh@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1970-10-30', 'gender' => 'male',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['diabetes_t2', 'hypertension']), 'allergies' => json_encode(['peanuts']),
                    'intolerances' => null, 'primary_goal' => 'blood_sugar_control',
                    'height_cm' => 174.0, 'weight_kg' => 90.0, 'activity_level' => 2,
                    'target_calories' => 1960, 'target_protein_g' => 100, 'target_carbs_g' => 190,
                    'target_fat_g' => 63, 'target_fibre_g' => 32, 'target_sodium_mg' => 1400,
                    'cuisine_preferences' => json_encode(['Ewe', 'West African', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 40,
                ],
            ],
            [
                'user' => [
                    'name' => 'Akosua Ampadu', 'email' => 'akosua.ampadu@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1992-12-18', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['ibs']), 'allergies' => json_encode(['shellfish']),
                    'intolerances' => json_encode(['lactose']), 'primary_goal' => 'symptom_management',
                    'height_cm' => 165.0, 'weight_kg' => 62.0, 'activity_level' => 3,
                    'target_calories' => 1730, 'target_protein_g' => 86, 'target_carbs_g' => 198,
                    'target_fat_g' => 57, 'target_fibre_g' => 22, 'target_sodium_mg' => 2000,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'Mediterranean']),
                    'dietary_preferences' => null, 'meals_per_day' => '4', 'max_cooking_minutes' => 30,
                ],
            ],
            [
                'user' => [
                    'name' => 'Richmond Opoku', 'email' => 'richmond.opoku@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1967-06-03', 'gender' => 'male',
                ],
                'practitioner_id' => $amirId,
                'health_profile' => [
                    'conditions' => json_encode(['hypertension', 'ckd']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'management',
                    'height_cm' => 174.0, 'weight_kg' => 76.0, 'activity_level' => 2,
                    'target_calories' => 1840, 'target_protein_g' => 50, 'target_carbs_g' => 245,
                    'target_fat_g' => 57, 'target_fibre_g' => 23, 'target_sodium_mg' => 1100,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'West African']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 35,
                ],
            ],
            [
                'user' => [
                    'name' => 'Esther Agyei', 'email' => 'esther.agyei@plandiet.com',
                    'password' => $pw, 'role' => 'client', 'status' => 'active',
                    'email_verified_at' => now(), 'date_of_birth' => '1988-11-04', 'gender' => 'female',
                ],
                'practitioner_id' => $sarahId,
                'health_profile' => [
                    'conditions' => json_encode(['hypercholesterolaemia']), 'allergies' => null,
                    'intolerances' => null, 'primary_goal' => 'cholesterol_management',
                    'height_cm' => 163.0, 'weight_kg' => 70.0, 'activity_level' => 3,
                    'target_calories' => 1800, 'target_protein_g' => 90, 'target_carbs_g' => 212,
                    'target_fat_g' => 55, 'target_fibre_g' => 35, 'target_sodium_mg' => 1800,
                    'cuisine_preferences' => json_encode(['Ghanaian', 'British']),
                    'dietary_preferences' => null, 'meals_per_day' => '3', 'max_cooking_minutes' => 30,
                ],
            ],

        ];
    }
}
