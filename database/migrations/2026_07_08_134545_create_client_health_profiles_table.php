<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_health_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->json('conditions')->nullable();
            $table->json('allergies')->nullable();
            $table->json('intolerances')->nullable();
            $table->string('primary_goal');
            $table->decimal('height_cm',5,1)->nullable();
            $table->decimal('weight_kg',5,1)->nullable();
            $table->decimal('activity_level',5,1)->nullable();
            $table->integer('target_calories')->nullable();
            $table->unsignedInteger('target_protein_g')->nullable();
            $table->unsignedInteger('target_carbs_g')->nullable();
            $table->unsignedInteger('target_fat_g')->nullable();
            $table->unsignedInteger('target_fibre_g')->nullable();
            $table->unsignedInteger('target_sodium_mg')->nullable();
            $table->json('cuisine_preferences')->nullable();
            $table->json('dietary_preferences')->nullable();
            $table->unsignedInteger('meals_per_day')->default(3);
            $table->unsignedInteger('max_cooking_minutes')->default(40);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_health_profiles');
    }
};
