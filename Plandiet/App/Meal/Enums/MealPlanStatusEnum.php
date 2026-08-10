<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum MealPlanStatusEnum: string
{
    use InteractsWithEnums;

    case GENERATED = 'generated';
    case ACCEPTED = 'accepted';
    case REPLACED = 'replaced';
}

