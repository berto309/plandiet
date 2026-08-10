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
        // Invite tokens sent by practitioners to prospective clients
        Schema::create('client_invites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_id')->constrained('users')->cascadeOnDelete();
            $table->string('email');
            $table->string('token')->unique();
            $table->string('invited_name')->nullable();

            $table->dateTime('expires_at');
            $table->dateTime('accepted_at')->nullable();
            $table->foreignId('client_id')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('next_review_date')->nullable();
            $table->timestamps();

            $table->index(['token']);
            $table->index(['practitioner_id', 'email']);
        });

        // Active practitioner–client
        Schema::create('practitioner_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->nullable();
            $table->timestamp('enrolled_at');
            $table->timestamp('discharged_at')->nullable();
            $table->text('clinical_notes')->nullable();   // practitioner-only field
            $table->dateTime('next_review_date')->nullable();
            $table->timestamps();

            $table->unique(['practitioner_id', 'user_id']);
            $table->index(['user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioner_clients');
        Schema::dropIfExists('client_invites');
    }
};
