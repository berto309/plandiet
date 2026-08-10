<?php


namespace Plandiet\App\Tools\RuleEditor\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum NutritionRuleConstraintTypeEnum: string
{
    use InteractsWithEnums;

    case HARD = 'hard';
    case SOFT = 'soft';
}
