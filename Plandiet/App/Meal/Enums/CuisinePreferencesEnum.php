<?php declare(strict_types=1);

namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum CuisinePreferencesEnum: string
{
    use InteractsWithEnums;
    case ITALIAN = 'italian';
    case INDIAN = 'indian';
    case CHINESE = 'chinese';
    case JAPANESE = 'japanese';
    case MEDITERRANEAN = 'mediterranean';
    case MIDDLE_EASTERN = 'middle eastern';
    case MEXICAN = 'mexican';
    case THAI = 'thai';
    case FRENCH = 'french';
    case BRITISH = 'british';
    case AMERICAN = 'american';
    case CARIBBEAN = 'caribbean';
    case AFRICAN = 'african';
    case VEGAN_CUISINE = 'vegan cuisine';
    case ASIAN = 'asian';

    case WEST_AFRICAN = 'west african';
    case GHANAIAN = 'ghanaian';

}
