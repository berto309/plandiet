<?php declare(strict_types=1);

namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum DietPrimaryGoalEnum: string
{
    use InteractsWithEnums;

    case WEIGHT_LOSS = 'weight loss';
    case WEIGHT_GAIN = 'weight gain';
    case WEIGHT_MAINTENANCE = 'weight maintenance';

    case IMPROVE_ENERGY = 'improve energy';
    case IMPROVE_DIGESTION = 'improve digestion';
    case IMPROVE_SLEEP = 'improve sleep';

    case MUSCLE_GAIN = 'muscle gain';
    case ATHLETIC_PERFORMANCE = 'athletic performance';

    case BLOOD_SUGAR_CONTROL = 'blood sugar control';
    case CHOLESTROL_REDUCTION = 'cholesterol reduction';
    case BLOOD_PRESSURE_CONTROL = 'blood pressure control';

    case IBS_MANAGEMENT = 'ibs management';
    case IBD_MANAGEMENT = 'ibd management';
    case GERD_MANAGEMENT = 'gerd management';
    case PCOS_MANAGEMENT = 'pcos management';

    case HEARTH_HEALTH = 'heart health';
    case LIVER_HEALTH = 'liver health';
    case KIDNEY_HEALTH = 'kidney health';

    case PREGNANCY_NUTRITION = 'pregnancy nutrition';
    case POSTNATAL_NUTRITION = 'postnatal nutrition';

    case HEALTHY_EATING = 'healthy eating';
    case HABIT_BUILDING = 'habit building';
    case RELATIONSHIP_WITH_FOOD = 'relationship with food';

    case MEDICAL_NUTRITION_THERAPY = 'medical nutrition therapy';
}

