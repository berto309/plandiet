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
        Schema::create('practitioner_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();


            $table->string('professional_title');           // e.g. Registered Dietitian
            $table->string('credential_type');              // e.g. RD, RN, CNS
            $table->string('registration_number')->unique();
            $table->string('regulator');                    // e.g. HCPC, AND, DAA
            $table->string('country_of_practice', )->nullable();      // ISO 3166-1 alpha-2
            $table->string('proof_of_identity')->nullable();
            $table->string('practice_name')->nullable();
            $table->text('bio')->nullable();
            $table->string('website')->nullable();
            $table->string('testimonial')->nullable();

            $table->string('verification_status');
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('rejection_reason')->nullable();
            $table->text('suspension_reason')->nullable();


            $table->date('registration_expiry')->nullable();
            $table->date('insurance_expiry')->nullable();

            // API check cache
            $table->json('regulator_api_response')->nullable();
            $table->timestamp('last_api_check_at')->nullable();


            $table->timestamps();
            $table->softDeletes();

            $table->index(['verification_status']);
            $table->index(['regulator', 'registration_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('practitioner_profiles');
    }
};
