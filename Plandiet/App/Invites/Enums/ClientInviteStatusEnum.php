<?php declare(strict_types=1);


namespace Plandiet\App\Invites\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum ClientInviteStatusEnum: string
{
    use InteractsWithEnums;
    case ACCEPTED = 'accepted';
    case PENDING = 'pending';
}
