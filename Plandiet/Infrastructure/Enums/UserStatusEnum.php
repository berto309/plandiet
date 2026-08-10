<?php declare(strict_types=1);


namespace Plandiet\Infrastructure\Enums;
enum UserStatusEnum: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case SUSPENDED = 'suspended';

    case INACTIVE = 'inactive';

    public function isNotActive(): bool
    {
        return $this === self::INACTIVE;
    }

}
