<?php


namespace Plandiet\App\Meal\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum AllergyEnum: string
{
    use InteractsWithEnums;

    case NUTS = 'nuts';
    case SHELFISH = 'shellfish';
    case PEANUTS = 'peanuts';
    case MILK = 'milk';
    case EGGS = 'eggs';
    case SOY = 'soy';
    case WHEAT = 'wheat';
    case FISH = 'fish';
    case SESAME = 'sesame';

}
