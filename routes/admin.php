<?php

use App\Http\Controllers\Analytics\Admin\AdminDashboardController;
use App\Http\Controllers\Analytics\Client\ClientsOverviewController;
use App\Http\Controllers\Audits\NutritionRuleHistoryController;
use App\Http\Controllers\Settings\AdminSettingsController;
use App\Http\Controllers\Tools\RuleEditor\RuleTemplateController;
use App\Http\Controllers\Users\AdminProfileController;
use App\Http\Controllers\Users\PractitionersManagementController;
use App\Http\Controllers\VerificationQueue\VerificationQueueController;

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {

    // Analytics
    Route::get('/', AdminDashboardController::class)->name('admin.dashboard');

    // Client Management
    Route::resource('clients', ClientsOverviewController::class)->except('create', 'store', 'edit');;

    // Practitioner Management
    Route::resource('practitioners', PractitionersManagementController::class)->except('create', 'store', 'edit');
    Route::put('practitioners/update-verification-status/{id}', [PractitionersManagementController::class, 'updateVerificationStatus'])->name('practitioners.update-verification-status');

    // Verification Queue
    Route::get('/verification-queue', VerificationQueueController::class)->name('verification-queue.index');

    // Tools: Rule templates
    Route::resource('rule-templates', RuleTemplateController::class)->except('edit');

    // Profile
    Route::get('profile', [AdminProfileController::class, 'index'])->name('admin.profile');
    Route::put('profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::put('profile/change-password', [AdminProfileController::class, 'changePassword'])->name('admin.profile.change-password');

    // Settings
    Route::resource('settings', AdminSettingsController::class)->only(['index', 'update']);

    // Audit
    Route::get('nutrition-rules-history', [NutritionRuleHistoryController::class, 'index'])->name('admin.nutrition-rules-history.index');
    Route::get('nutrition-rules-history/{nutritionRuleHistory}/show', [NutritionRuleHistoryController::class, 'show'])->name('admin.nutrition-rules-history.show');


});
