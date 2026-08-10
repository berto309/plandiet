<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum MealTypeEnum: string
{
    use InteractsWithEnums;

    case BREAKFAST = 'breakfast';
    case LUNCH = 'lunch';
    case DINNER = 'dinner';
    case SNACK = 'snack';

    case ALL = 'all';
}
