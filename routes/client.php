<?php


use App\Http\Controllers\Analytics\Client\ClientDashboardController;
use App\Http\Controllers\Invites\ViewPractitionerInviteController;
use App\Http\Controllers\Meal\MealPlanController;
use App\Http\Controllers\Meal\MealRatingController;
use App\Http\Controllers\Meal\MealSwapController;
use App\Http\Controllers\Meal\TodayMealPlanController;
use App\Http\Controllers\Users\ClientAccountController;
use App\Http\Controllers\Users\ClientComplianceController;
use App\Http\Controllers\Users\ClientProfileController;
use App\Http\Controllers\Users\MealHistoryController;

// Invitation
Route::get('invitation/{invite}/practitioner/{practitioner}/invite/{token}', ViewPractitionerInviteController::class)->name('client.invite');
Route::post('invitation/accept', [ClientAccountController::class, 'acceptInvite'])->name('client.invite.accept');

Route::prefix('client')->middleware(['auth'])->group(function () {

    // Analytics
    Route::get('/', ClientDashboardController::class)->name('client.dashboard');
    Route::get('/meal-plans/today', TodayMealPlanController::class)->name('client.meal-plans.today');



    // Meal Plan
    Route::post('meal-plans/generate', MealPlanController::class)->name('meal-plans.generate');

    // Meal Swap
    Route::put('meal-plan-item/{meal}/swap',  MealSwapController::class)->name('meal-plan-item.swap');

    // Meal Rate
    Route::put('meal-plan-item/{meal}/rate',  MealRatingController::class)->name('meal-plan-item.rate');

    // Meal History
    Route::get('meal-history', MealHistoryController::class)->name('client.meal-history');

    // Tools: Compliance
//    Route::get('compliance', ClientComplianceController::class)->name('client.compliance');

    // Profile
    Route::get('profile', [ClientProfileController::class, 'index'])->name('client.profile');
    Route::get('profile/edit', [ClientProfileController::class, 'edit'])->name('client.profile.edit');
    Route::put('profile', [ClientProfileController::class, 'update'])->name('client.profile.update');
    Route::put('profile/change-password', [ClientProfileController::class, 'changePassword'])->name('client.profile.change-password');

});
