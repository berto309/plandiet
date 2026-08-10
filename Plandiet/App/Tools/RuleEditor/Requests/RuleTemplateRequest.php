<?php

namespace Plandiet\App\Tools\RuleEditor\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\App\Tools\RuleEditor\Enums\RuleTemplateCategoryEnum;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class RuleTemplateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', $this->method() === 'POST' ? 'unique:rule_templates,name': Rule::unique('rule_templates')->ignore($this->route('rule_template')->id)],
            'condition_tag' => ['required', 'string', 'max:100'],
            'nutrient' => ['required', 'string', 'max:100'],
            'operator' => ['required', 'string', 'max:100', Rule::enum(OperatorEnum::class)],
            'default_value' => ['nullable'],
            'unit' => ['required', 'string', 'max:5', Rule::enum(NutritionRuleUnitEnum::class)],
            'constraint_type' => ['required', 'string', 'max:20', Rule::enum(NutritionRuleConstraintTypeEnum::class)],
            'category' => ['required', 'string', 'max:100', Rule::enum(RuleTemplateCategoryEnum::class)],
            'priority' => ['required', 'string', 'max: 20', Rule::enum(NutritionRulePriorityEnum::class)],
            'clinical_rationale' => ['nullable', 'string', 'max:255'],
            'evidence_source' => ['nullable', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    public function attributes(): array
    {
        return [
            'default_value' => 'value'
        ];

    }
}
