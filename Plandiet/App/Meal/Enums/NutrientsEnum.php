<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Enums;

use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum NutrientsEnum: string
{
    use InteractsWithEnums;

    // Macronutrients
    case CARBS_G = 'carbs_g';
    case PROTEIN_G = 'protein_g';
    case FAT_G = 'fat_g';
    case SAT_FAT_G = 'sat_fat_g';
    case FIBRE_G = 'fibre_g';

    // Micronutrients
    case SODIUM_MG = 'sodium_mg';
    case SODIUM_MG_DAILY = 'sodium_mg_daily';
    case POTASSIUM_MG = 'potassium_mg';
    case PHOSPHORUS_MG = 'phosphorus_mg';
    case CALCIUM_MG = 'calcium_mg';
    case IRON_MG = 'iron_mg';
    case MAGNESIUM_MG = 'magnesium_mg';
    case ZINC_MG = 'zinc_mg';

    // Energy
    case CALORIES = 'calories';

    // Glycaemic
    case GLYCAEMIC_INDEX = 'glycaemic_index';
    case GLYCAEMIC_LOAD = 'glycaemic_load';

    // Allergens/ingredients
    case TREE_NUTS = 'tree_nuts';
    case PEANUTS = 'peanuts';
    case SHELLFISH = 'shellfish';
    case GLUTEN = 'gluten';
    case DAIRY = 'dairy';
    case EGGS = 'eggs';
    case SOY = 'soy';
    case FISH = 'fish';
    case SESAME = 'sesame';
    case WHEAT = 'wheat';
    case PORK = 'pork';
    case ALCOHOL = 'alcohol';

    // Dietary flags
    case HALAL = 'halal';
    case KOSHER = 'kosher';
    case VEGAN = 'vegan';
    case VEGETARIAN = 'vegetarian';
    case GLUTEN_FREE = 'gluten_free';






}
