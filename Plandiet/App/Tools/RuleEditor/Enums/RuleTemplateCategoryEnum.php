<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Enums;

use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum RuleTemplateCategoryEnum: string
{
    use InteractsWithEnums;

    case ALLERGY = 'allergy';
    case CHRONIC_CONDITION = 'chronic condition';
    case RELIGIOUS_AND_DIETARY = 'religious & dietary';
    case LIFESTYLE = 'lifestyle';
    case OTHER = 'other';
}
