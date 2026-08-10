<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum NutritionRuleUnitEnum: string
{
    use InteractsWithEnums;
    case G = 'g';
    case MG = 'mg';
    case GI = 'GI';
    case KCAL = 'kcal';
}
