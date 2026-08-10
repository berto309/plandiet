<?php declare(strict_types=1);


namespace Plandiet\App\Invites\Actions;

use Plandiet\App\Invites\Models\ClientInvite;

final class RevokeInvite
{
    public function revoke(ClientInvite $invite): void
    {
        $invite->delete();
    }
}
