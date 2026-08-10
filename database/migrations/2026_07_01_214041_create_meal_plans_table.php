<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meal_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('practitioner_id')->nullable()->constrained('users')->nullOnDelete();

            // Aggregate nutrition for the day
            $table->unsignedSmallInteger('total_calories')->default(0);
            $table->decimal('total_protein_g', 6, 1)->default(0);
            $table->decimal('total_carbs_g', 6, 1)->default(0);
            $table->decimal('total_fat_g', 6, 1)->default(0);
            $table->decimal('total_fibre_g', 6, 1)->default(0);
            $table->unsignedSmallInteger('total_sodium_mg')->default(0);

            // Symbolic engine output
            $table->json('rules_applied')->nullable();      // which rule IDs fired
            $table->json('rules_violated')->nullable();     // any near-misses logged
            $table->string('generation_model')->nullable(); // e.g. claude-sonnet-4-5
            $table->unsignedInteger('generation_ms')->nullable();

            $table->string('status'); // generated, accepted, replaced
            $table->timestamps();
    // removed plan date
            $table->index(['practitioner_id']);
        });

        Schema::create('meal_plan_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('meal_plan_id')->constrained()->cascadeOnDelete();
            $table->string('meal_type'); // breakfast, lunch, dinner , snack
            $table->unsignedTinyInteger('meal_order')->default(1); // for multiple snacks

            $table->string('name');
            $table->text('description')->nullable();
            $table->text('ingredients')->nullable();
            $table->text('recipe_steps')->nullable();
            $table->unsignedSmallInteger('prep_minutes')->nullable();

            // Nutrition per item
            $table->unsignedSmallInteger('calories')->default(0);
            $table->decimal('protein_g', 5, 1)->default(0);
            $table->decimal('carbs_g', 5, 1)->default(0);
            $table->decimal('fat_g', 5, 1)->default(0);
            $table->decimal('sat_fat_g', 5, 1)->default(0);
            $table->decimal('fibre_g', 5, 1)->default(0);
            $table->unsignedSmallInteger('sodium_mg')->default(0);

            // Explainability
            $table->text('why_chosen')->nullable();         // plain-language rationale
            $table->json('rules_matched')->nullable();      // rule IDs that validated this item
            $table->json('candidates_rejected')->nullable();// summary of what was filtered out
            $table->unsignedTinyInteger('rating')->default(0);          // 1–5
            $table->text('comment')->nullable();
            $table->boolean('would_eat_again')->nullable();

            $table->boolean('was_swapped')->default(false);
            $table->timestamps();

            $table->index(['client_id', 'meal_plan_id', 'meal_type']);
        });

    }

    public function down(): void
    {
//        Schema::dropIfExists('meal_ratings');
        Schema::dropIfExists('meal_plan_items');
        Schema::dropIfExists('meal_plans');
    }
};
