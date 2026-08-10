<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Enums;
enum AppliesWhenEnum: string
{
    case BREAKFAST_ONLY = 'breakfast only';
    case LUNCH_ONLY = 'lunch only';
    case SNACKS_ONLY = 'snacks only';
    case DINNER_ONLY = 'dinner only';

    case ALL = 'all';
}
