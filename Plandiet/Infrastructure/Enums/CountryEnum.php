<?php declare(strict_types=1);

namespace Plandiet\Infrastructure\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum CountryEnum: string
{
    use InteractsWithEnums;
    case UNITED_KINGDOM = 'United Kingdom';
}
