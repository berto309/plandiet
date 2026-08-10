<?php

namespace Plandiet\App\Tools\RuleEditor\Models;

use Illuminate\Database\Eloquent\Model;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\App\Tools\RuleEditor\Enums\RuleTemplateCategoryEnum;
use Plandiet\Infrastructure\Enums\OperatorEnum;
use Plandiet\Infrastructure\Traits\HasSlug;

class RuleTemplate extends Model
{
    use HasSlug;
    protected function casts(): array
    {
        return [
            'category' => RuleTemplateCategoryEnum::class,
            'operator' => OperatorEnum::class,
            'constraint_type' => NutritionRuleConstraintTypeEnum::class,
            'priority' => NutritionRulePriorityEnum::class,
            'is_active' => 'boolean',
            'unit' => NutritionRuleUnitEnum::class
        ];
    }


    public function sluggable(): string
    {
        return 'name';
    }
}
