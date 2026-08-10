<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Enums;

use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum CredentialTypeEnum: string
{
    use InteractsWithEnums;

    case RD = 'RD';
    case RN = 'RNutr';
}
