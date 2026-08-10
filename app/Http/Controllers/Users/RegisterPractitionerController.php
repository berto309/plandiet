<?php


namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Fluent;
use Illuminate\Validation\Rule;
use Plandiet\App\PractitionerVerification\Enums\ProofOfIdentityEnum;
use Plandiet\App\Users\Practitioner\Actions\RegisterAsPractitioner;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\App\Users\Practitioner\Enums\RegulatorEnum;
use Plandiet\Infrastructure\Enums\CountryEnum;
use Plandiet\Infrastructure\Enums\GenderEnum;

class RegisterPractitionerController extends Controller
{

    public function __invoke(Request $request): RedirectResponse
    {
        $data = $request->validate(rules: [
                'step0.name' => ['required', 'string', 'max:255'],
                'step0.email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
                'step0.phone' => ['required', 'string', 'max:20'],
                'step0.date_of_birth' => ['required', 'date'],
                'step0.gender' => ['required', Rule::enum(GenderEnum::class)],
                'step0.password' => ['required', 'string', 'min:8', 'confirmed'],
                'step0.password_confirmation' => ['required', 'string', 'min:8'],
                'step0.post_code' => ['required', 'string', 'max:10'],
                'step0.city' => ['required', 'string', 'max:255'],
                'step0.address' => ['required', 'string', 'max:255'],
                'step1.professional_title' => ['required', 'string', 'max:255', Rule::enum(ProfessionalTitleEnum::class)],
                'step1.registration_number' => ['required', 'string', 'max:20', Rule::unique('practitioner_profiles', 'registration_number')],
                'step1.country_of_practice' => ['required', 'string', Rule::enum(CountryEnum::class)],
                'step1.regulator' => ['required', 'string', 'max:255', Rule::enum(RegulatorEnum::class)],
                'step1.practice_name' => ['required', 'string', 'max:255'],
                'step1.website' => ['nullable', 'string', 'max:255'],
                'step2.proof_of_identity' => ['required', 'string', Rule::enum(ProofOfIdentityEnum::class)],
                'step2.qualification_certificate' => ['required', 'file', 'max:6144'],
                'step2.proof_of_address' => ['required', 'file', 'max:6144'],
                'step2.proof_of_identity_file' => ['required', 'file', 'max:6144'],
                'confirm_accuracy' => ['required', 'boolean', 'accepted'],
        ], attributes: [
            'step0.name' => 'name',
            'step0.email' => 'email',
            'step0.phone' => 'phone',
            'step0.date_of_birth' => 'date of birth',
            'step0.gender' => 'gender',
            'step0.password' => 'password',
            'step0.password_confirmation' => 'confirm password',
            'step0.post_code' => 'post code',
            'step0.city' => 'city',
            'step0.address' => 'address',
            'step1.professional_title' => 'professional title',
            'step1.registration_number' => 'registration number',
            'step1.country_of_practice' => 'country of practice',
            'step1.regulator' => 'regulator',
            'step1.practice_name' => 'practice name',
            'step1.website' => 'website',
            'step2.qualification_certificate' => 'qualification certificate',
            'step2.proof_of_identity' => 'proof of identity',
            'step2.proof_of_address' => 'proof of address',
            'step2.proof_of_identity_file' => 'proof of identity',
        ]);


        app(RegisterAsPractitioner::class)->register($data);

        return back();


    }

}
