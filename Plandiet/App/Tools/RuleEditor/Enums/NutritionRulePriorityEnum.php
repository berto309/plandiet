<?php


namespace Plandiet\App\Tools\RuleEditor\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum NutritionRulePriorityEnum: string
{
    use InteractsWithEnums;

    case CRITICAL = 'critical';
    case HIGH = 'high';
    case MEDIUM = 'medium';
    case LOW = 'low';
}
