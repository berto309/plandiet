<?php

use App\Http\Controllers\Users\RegisterPractitionerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Plandiet\App\PractitionerVerification\Enums\ProofOfIdentityEnum;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\App\Users\Practitioner\Enums\RegulatorEnum;
use Plandiet\Infrastructure\Enums\CountryEnum;
use Plandiet\Infrastructure\Enums\GenderEnum;

Route::get('/', function () {
    return inertia('Welcome', [
        'regulators' => RegulatorEnum::toArray(),
        'status' => session('status')
    ]);
})->name('home');

Route::get('reset-password/{token}', fn ($token, Request $request) => Inertia::render('auth/ResetPassword', [
    'email' => $request->email,
    'token' => $request->route('token'),
]));

Route::get('/register', function () {
    return inertia('auth/Register', [
        'profTitles' => ProfessionalTitleEnum::toArray(),
        'genders' => GenderEnum::toArray(),
        'regulators' => RegulatorEnum::toArray(),
        'countries' => CountryEnum::toArray(),
        'proofOfIdentitiesList' => ProofOfIdentityEnum::toArray(),
    ]);
});

Route::post('/register-practitioner', RegisterPractitionerController::class);

require __DIR__.'/admin.php';
require __DIR__.'/practitioner.php';
require __DIR__.'/client.php';
