<?php

namespace Plandiet\App\Users\Practitioner\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Plandiet\App\Users\Practitioner\Enums\CredentialTypeEnum;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;

class PractitionerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->route('practitioner')->id)],
            'role' => ['required', 'string', 'max:100', Rule::enum(UserroleEnum::class)],
            'status' => ['required', 'string', 'max:100', Rule::enum(UserStatusEnum::class)],
            'gender' => ['required', 'string', 'max:100', Rule::enum(GenderEnum::class)],
            'date_of_birth' => ['nullable', 'date', 'date_format:Y-m-d'],
            'phone' => ['nullable', 'string', 'max:15'],
            'professional_title' => ['nullable', 'string', 'max:255'],
            'practice_name' => ['nullable', 'string', 'max:255'],
            'credential_type' => ['nullable', 'string', 'max:255', Rule::enum(CredentialTypeEnum::class)],
            'registration_number' => ['required', 'string', 'max:15'], // only admin can update
            'regulator' => ['required', 'string', 'max:255'], // only admin can update
            'bio' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ];
    }
}
