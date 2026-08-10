<?php declare(strict_types=1);

namespace Plandiet\App\PractitionerVerification\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum ProofOfIdentityEnum: string
{
    use InteractsWithEnums;
    case PASSPORT = 'passport';
    case DRIVER_LICENSE = 'driver license';
    case NATIONAL_IDENTITY_CARD = 'national identity card';
}
