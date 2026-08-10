<?php declare(strict_types=1);


namespace Plandiet\Infrastructure\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum UserRoleEnum: string
{
    use InteractsWithEnums;

    case SUPER_ADMIN = "admin";
    case PRACTITIONER = "practitioner";
    case CLIENT = "client";

    public function isAdmin(): bool
    {
        return $this === self::SUPER_ADMIN;
    }

    public function isPractitioner(): bool
    {
        return $this === self::PRACTITIONER;
    }


    public function isClient(): bool
    {
        return $this === self::CLIENT;
    }
}
