<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if(app()->isProduction()){
            $this->call([
                UserSeeder::class,
                RuleTemplateSeeder::class,
            ]);
        } else {
            $this->call([
                UserSeeder::class,
                RuleTemplateSeeder::class,
                PractitionerSeeder::class,
                ClientSeeder::class,
                NutritionRuleSeeder::class,
            ]);
        }
    }
}
