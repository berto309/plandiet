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
            'value' => [ Rule::requiredIf(fn () => in_array($this->input('operator'), [
                OperatorEnum::LESS_THAN_OR_EQUAL_TO->value,
                OperatorEnum::GREATER_THAN_OR_EQUAL_TO->value,
                OperatorEnum::EQUAL_TO->value,
                ])),
                'nullable',
                'numeric',
                'min:0',
                'max:99999',
            ],
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

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // EXCLUDE / REQUIRE / PRIORITISE must not have a value
            $noValueOps = [
                OperatorEnum::EXCLUDE->value,
                OperatorEnum::REQUIRE->value,
                OperatorEnum::PRIORITIZE->value,
                ];
            if (
                in_array($this->input('operator'), $noValueOps)
                && !is_null($this->input('value'))
            ) {
                $validator->errors()->add(
                    'value',
                    "The '{$this->input('operator')}' operator does not accept a numeric value."
                );
            }

            // Soft rules cannot have critical priority
            if (
                $this->input('constraint_type') === NutritionRuleConstraintTypeEnum::SOFT->value
                && $this->input('priority') === NutritionRulePriorityEnum::CRITICAL->value
            ) {
                $validator->errors()->add(
                    'priority',
                    "Soft rules cannot be assigned 'critical' priority. "
                    . "Critical priority is reserved for hard constraints only."
                );
            }

            // PRIORITISE is only valid on soft rules
            if (
                $this->input('operator') === OperatorEnum::PRIORITIZE->value
                && $this->input('constraint_type') !== 'soft'
            ) {
                $validator->errors()->add(
                    'operator',
                    "The 'prioritise' operator is only valid for soft constraints."
                );
            }
        });
    }



}
