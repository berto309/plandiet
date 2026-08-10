<?php declare(strict_types=1);


namespace Plandiet\App\Invites\Actions;

use App\Mail\PractitionerInviteMail;
use Illuminate\Support\Facades\Mail;
use Plandiet\App\Invites\Models\ClientInvite;
use \Illuminate\Support\Str;

final class ResendInvite
{
    public function resend(ClientInvite $invite): void
    {
        $invite->update([
            'token' => Str::random(64),
            'expires_at' => now()->addDays(7),
        ]);

        $practitioner = auth()->user();

        Mail::to($invite->invited_name)->send(new PractitionerInviteMail(
            clientInvite: $invite,
            practitionerId: $invite->practitioner_id,
            practitionerName: $practitioner->name,
            practitionerEmail: $practitioner->email,
        ));


    }
}
