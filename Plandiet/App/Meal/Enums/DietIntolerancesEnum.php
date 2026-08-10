<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum DietIntolerancesEnum: string
{
    use InteractsWithEnums;
    case GLUTEN = 'gluten';
    case DAIRY = 'dairy';
    case LACTOSE = 'lactose';
    case NUTS = 'nuts';
    case PEANUTS = 'peanuts';
    case SOY = 'soy';
    case EGGS = 'eggs';
    case SHELLFISH = 'shellfish';
    case FISH = 'fish';
    case SESAME = 'sesame';
    case SULPHITES = 'sulphites';
    case FODMAP = 'fodmap';
}
