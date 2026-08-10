<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum DietaryPreferencesEnum: string
{
    use InteractsWithEnums;
    case VEGETARIAN = 'vegetarian';
    case VEGAN = 'vegan';
    case PESCATARIAN = 'pescatarian';
    case FLEXITARIAN = 'flexitarian';
    case LOW_CARB = 'low_carb';
    case LOW_FAT = 'low fat';
    case HIGH_PROTEIN = 'high protein';
    case MEDITERRANEAN_DIET = 'mediterranean diet';
    case PALEO = 'paleo';
    case KETO = 'keto';
    case WHOLE_FOOD_PLANT_BASED = 'whole food plant based';
    case GLUTEN_AWARE = 'gluten aware';
    case HALAL = 'halal';
}
