<?php

namespace Plandiet\App\Tools\RuleEditor\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class NutritionRule extends Model
{
    protected function casts(): array
    {
        return [
            'operator' => OperatorEnum::class,
            'unit' => NutritionRuleUnitEnum::class,
            'constraint_type' => NutritionRuleConstraintTypeEnum::class,
            'priority' => NutritionRulePriorityEnum::class,
            'is_active' => 'boolean',
        ];
    }

    protected function appliesWhen(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
        );
    }


    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function practitioner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'practitioner_id');
    }

    public function ruleTemplate(): BelongsTo
    {
        return $this->belongsTo(RuleTemplate::class);
    }
}
