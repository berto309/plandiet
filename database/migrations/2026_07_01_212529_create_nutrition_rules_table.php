<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Platform-level clinical rule templates (managed by super_admin)
        Schema::create('rule_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('condition_tag');           // e.g. diabetes_t2, hypertension
            $table->string('nutrient');                // calories, sodium, carbs, sat_fat, fibre…
            $table->string('operator');                // lte, gte, eq, prioritize
            $table->decimal('default_value', 8, 2)->nullable();
            $table->string('unit')->nullable();        // g, mg, kcal
            $table->string('constraint_type');
            $table->string('category');
            $table->string('priority');
            $table->text('clinical_rationale')->nullable();
            $table->string('evidence_source')->nullable(); // e.g. NHS guidelines 2024
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            $table->index(['slug', 'category', 'is_active']);
        });

        // Per-client rules — set by practitioners, optionally from templates
        Schema::create('nutrition_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('practitioner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('rule_template_id')->nullable()->constrained()->nullOnDelete();

            $table->string('name');
            $table->string('nutrient');
            $table->string('operator');
            $table->decimal('value', 8, 2)->nullable();
            $table->string('unit')->nullable();
            $table->string('constraint_type');
            $table->string('priority');

            // Applicability conditions (JSON for flexibility)
            // e.g. {"meal_type": "all"} or {"goal": "weight_loss"}
            $table->json('applies_when')->nullable();

            $table->boolean('is_active')->default(true);
            $table->text('practitioner_note')->nullable();
            $table->unsignedInteger('version')->default(1);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['client_id', 'is_active']);
            $table->index(['practitioner_id']);
        });

        // Full version history of every rule change
        Schema::create('nutrition_rule_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nutrition_rule_id')->constrained()->cascadeOnDelete();
            $table->foreignId('changed_by')->constrained('users')->cascadeOnDelete();
            $table->string('action'); // ['created', 'updated', 'activated', 'deactivated', 'deleted']
            $table->json('previous_state')->nullable();
            $table->json('new_state');
            $table->text('change_reason')->nullable();
            $table->timestamps();

            $table->index(['nutrition_rule_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nutrition_rule_history');
        Schema::dropIfExists('nutrition_rules');
        Schema::dropIfExists('rule_templates');
    }
};
