<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Practitioner sandbox: test rules before publishing
        Schema::create('rule_sandbox_tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('client_id')->nullable()->constrained('users')->nullOnDelete();
            $table->json('test_profile');           // snapshot of profile used
            $table->json('rule_set_snapshot');      // rules tested (may include unpublished)
            $table->json('candidate_meals');        // LLM-generated candidates
            $table->json('results');                // pass/fail per candidate per rule
            $table->unsignedSmallInteger('pass_count');
            $table->unsignedSmallInteger('fail_count');
            $table->timestamps();

            $table->index(['practitioner_id']);
        });

        // Weekly compliance summaries for practitioner dashboard
        Schema::create('compliance_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('practitioner_id')->constrained('users')->cascadeOnDelete();
            $table->date('week_start');

            $table->unsignedTinyInteger('plans_generated')->default(0);
            $table->decimal('avg_calories', 6, 1)->nullable();
            $table->decimal('avg_protein_g', 5, 1)->nullable();
            $table->decimal('avg_carbs_g', 5, 1)->nullable();
            $table->decimal('avg_fat_g', 5, 1)->nullable();
            $table->decimal('avg_fibre_g', 5, 1)->nullable();
            $table->unsignedSmallInteger('avg_sodium_mg')->nullable();

            $table->json('rules_consistently_met')->nullable();
            $table->json('rules_at_risk')->nullable();  // approaching limits
            $table->unsignedTinyInteger('meals_swapped')->default(0);
            $table->decimal('avg_rating', 3, 2)->nullable();

            $table->timestamps();

            $table->unique(['client_id', 'week_start']);
            $table->index(['practitioner_id', 'week_start']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compliance_reports');
        Schema::dropIfExists('rule_sandbox_tests');
    }
};
