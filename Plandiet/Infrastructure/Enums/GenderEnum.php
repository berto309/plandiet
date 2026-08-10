<?php declare(strict_types=1);


namespace Plandiet\Infrastructure\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum GenderEnum: string
{
    use InteractsWithEnums;

    case MALE = "male";
    case FEMALE = "female";
    case OTHER = "other";
    case PREFER_NOT_TO_SAY = "prefer not to say";
}
