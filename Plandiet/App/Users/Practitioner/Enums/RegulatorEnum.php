<?php


namespace Plandiet\App\Users\Practitioner\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum RegulatorEnum: string
{
    use InteractsWithEnums;

    case HCPC = 'HCPC';
    case AFN = 'AfN';
}
