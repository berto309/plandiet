<?php


namespace Plandiet\App\Users\Client\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Plandiet\App\Meal\Enums\AllergyEnum;
use Plandiet\App\Meal\Enums\CuisinePreferencesEnum;
use Plandiet\App\Meal\Enums\DietaryPreferencesEnum;
use Plandiet\App\Meal\Enums\DietIntolerancesEnum;
use Plandiet\App\Users\Client\Enums\ClientConditionsEnum;


class ClientHealthProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role->isPractitioner();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'conditions.*' => ['required', 'array', Rule::enum(ClientConditionsEnum::class)],
            'allergies.*' => ['nullable', 'array', Rule::enum(AllergyEnum::class)],
            'intolerances.*' => ['nullable', 'array', Rule::enum(DietIntolerancesEnum::class)],
            'primary_goal' => ['required', 'string', 'max:255'],
            'height_cm' => ['nullable'],
            'weight_kg' => ['nullable'],
            'activity_level' => ['nullable'],
            'target_calories' => ['nullable', 'numeric', 'min:1'],
            'target_protein_g' => ['nullable', 'numeric', 'min:1'],
            'target_carbs_g' => ['nullable', 'numeric', 'min:1'],
            'target_fat_g' => ['nullable', 'numeric', 'min:1'],
            'target_fibre_g' => ['nullable', 'numeric', 'min:1'],
            'target_sodium_mg' => ['nullable', 'numeric', 'min:1'],
            'cuisine_preferences.*' => ['nullable', 'array', Rule::enum(CuisinePreferencesEnum::class)],
            'dietary_preferences.*' => ['nullable', 'array', Rule::enum(DietaryPreferencesEnum::class)],
        ];
    }

    protected function passedValidation(): void
    {
        $this->merge([
            'user_id' => $this->route('client')->id
        ]);
    }
}
