<?php declare(strict_types=1);


namespace Plandiet\App\Invites\Actions;

use Plandiet\App\Invites\Models\ClientInvite;

final class GetInvites
{
    public function get(): \Illuminate\Pagination\LengthAwarePaginator
    {
        return ClientInvite::where('practitioner_id', auth()->id())
            ->latest()
            ->paginate();
    }
}
