<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            [
                'name'              => 'Platform Admin',
                'email'             => 'admin@plandiet.com',
                'password'          => Hash::make('123456'),
                'role'              => UserRoleEnum::SUPER_ADMIN,
                'phone'             => '07325658874',
                'date_of_birth'     =>  now()->subYears(30),
                'status'            => 'active',
                'gender'            =>  GenderEnum::MALE->value,
                'email_verified_at' => now(),
            ],


        ]);
    }
}
