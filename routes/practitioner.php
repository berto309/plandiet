<?php

use App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController;
use App\Http\Controllers\Invites\InviteController;
use App\Http\Controllers\Settings\PractitionerSettingsController;
use App\Http\Controllers\Tools\Compliance\PractitionerComplianceController;
use App\Http\Controllers\Tools\RuleEditor\NutritionRuleController;
use App\Http\Controllers\Tools\Sandbox\RunSandboxController;
use App\Http\Controllers\Tools\Sandbox\ViewSandbox;
use App\Http\Controllers\Tools\Sandbox\ViewSandboxResults;
use App\Http\Controllers\Tools\Sandbox\ShowSandboxTestResult;
use App\Http\Controllers\Users\PractitionerClientController;
use App\Http\Controllers\Users\PractitionerProfileController;

Route::prefix('practitioner')->middleware(['auth', 'practitioner','practitioner.verified'])->group(function () {

    // Analytics
    Route::get('/', PractitionerDashboardController::class)->name('practitioner.dashboard');

    // Clients
    Route::get('clients', [PractitionerClientController::class, 'index'])->name('practitioner.clients');
    Route::get('clients/{client}/create-health-profile', [PractitionerClientController::class, 'create'])->name('pratitioner.clients.create-health-profile');
    Route::post('clients/{client}/create-health-profile', [PractitionerClientController::class, 'store'])->name('pratitioner.clients.store-health-profile');
    Route::get('clients/{client}', [PractitionerClientController::class, 'show'])->name('practitioner.clients.show');
    Route::get('clients/{client}/edit', [PractitionerClientController::class, 'edit'])->name('practitioner.clients.edit');
    Route::put('clients/{client}/update-clinical-notes', [PractitionerClientController::class, 'updateClinicalNotes'])->name('practitioner.clients.update.clinical_notes');
    Route::put('/clients/{client}/update-client-profile', [PractitionerClientController::class, 'updateClientHealthProfile'])->name('practitioner.clients.update.profile');
    Route::put('clients/{client}/update-next-review-date', [PractitionerClientController::class, 'updateClientNextReviewDate'])->name('practitioner.clients.update.next_review_date');


    // Tools: Rule Editor
    Route::resource('nutrition-rules', NutritionRuleController::class)->except('edit');

    // Tools: Sandbox
    Route::get('sandbox', ViewSandbox::class)->name('sandbox.view');
    Route::get('sandbox/results', ViewSandboxResults::class)->name('sandbox.results');
    Route::get('sandbox/{sandbox}/results', ShowSandboxTestResult::class)->name('sandbox.results.show');
    Route::post('sandbox/run', RunSandboxController::class)->name('sandbox.run');


    // Tools: Compliance
    Route::get('compliance', [PractitionerComplianceController::class, 'index'])->name('compliance');
    Route::get('{client}/compliance', [PractitionerComplianceController::class, 'show'])->name('compliance-practitioner.show');

    // Invites
    Route::resource('invites', InviteController::class)->only('index', 'create', 'show', 'store');
    Route::put('invites/{invite}/resend', [InviteController::class, 'resend'])->name('invites.resend');
    Route::delete('invites/{invite}/revoke', [InviteController::class, 'revoke'])->name('invites.revoke');

    // Profile
    Route::get('profile', [PractitionerProfileController::class, 'index'])->name('practitioner.profile');
    Route::get('profile/edit', [PractitionerProfileController::class, 'edit'])->name('practitioner.profile.edit');
    Route::put('profile', [PractitionerProfileController::class, 'update'])->name('practitioner.profile.update');
    Route::put('profile/update-practitioner-information', [PractitionerProfileController::class, 'updatePractitionerProfileInfo'])->name('practitioner-profile-information.update');
    Route::put('profile/change-password', [PractitionerProfileController::class, 'changePassword'])->name('practitioner.profile.change-password');

    // Settings
    Route::resource('settings', PractitionerSettingsController::class)->only(['index', 'update']);
});
