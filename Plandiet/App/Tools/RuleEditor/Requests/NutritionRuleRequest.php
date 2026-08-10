<?php

namespace Plandiet\App\Tools\RuleEditor\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Plandiet\App\Tools\RuleEditor\Enums\AppliesWhenEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class NutritionRuleRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->role->isPractitioner();
    }


    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:users,id'],
            'practitioner_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'nutrient' => ['required', 'string', 'max:255'],
            'operator' => ['required', Rule::enum(OperatorEnum::class)],
            'value' => ['nullable'],
            'unit' => ['nullable', 'string', 'max:25', Rule::enum(NutritionRuleUnitEnum::class)],
            'constraint_type' => ['required', 'string', 'max:25', Rule::enum(NutritionRuleConstraintTypeEnum::class)],
            'priority' => ['required', 'string', 'max:25',Rule::enum( NutritionRulePriorityEnum::class)],
            'applies_when' => ['required',],
            'is_active' => ['required', 'boolean'],
            'practitioner_note' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function attributes(): array
    {
        return [
            'client_id' => 'clients',
            'practitioner_id' => 'practitioner',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'practitioner_id' => auth()->id(),
            'applies_when' => json_encode(['meal_type' => AppliesWhenEnum::ALL->value])
        ]);
    }



}
