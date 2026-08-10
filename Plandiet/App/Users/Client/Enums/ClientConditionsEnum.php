<?php


namespace Plandiet\App\Users\Client\Enums;

use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum ClientConditionsEnum: string
{
    use InteractsWithEnums;

    case DIABETES_TYPE_2 = 'diabetes_t2';
    case HYPERTENSION = 'hypertension';
    case HYPERCHOLESTEROLAEMIA = 'hypercholesterolaemia';
    case THYROID = 'thyroid';
    case CHRONIC_KIDNEY_DISEASE = 'ckd';
    case LIVER_DISEASES = 'liver_disease';
    case PCOS = 'pcos';
    case OBESITY = 'obesity';


}
