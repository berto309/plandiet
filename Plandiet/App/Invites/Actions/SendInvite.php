<?php declare(strict_types=1);


namespace Plandiet\App\Invites\Actions;

use App\Mail\PractitionerInviteMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Plandiet\App\Invites\Enums\ClientInviteStatusEnum;
use Plandiet\App\Invites\Models\ClientInvite;
use Str;

final class SendInvite
{

    public static function invite(array $data): void
    {
        $inviteMail = $data['email'];
        $practitioner = auth()->user();

        $pendingInviteForEmail = ClientInvite::where('practitioner_id', $practitioner->id)
            ->where('email', $inviteMail)
            ->whereNull('accepted_at');

        if ($pendingInviteForEmail->exists()) {
            $pendingInviteForEmail->delete();
        }


        $invitation = ClientInvite::create([
            'practitioner_id' => $practitioner->id,
            'email' => $inviteMail,
            'token' => Str::random(64),
            'invited_name' => $data['invited_name'],
            'next_review_date' => $data['next_review_date'],
            'expires_at' => now()->addDays(5),
        ]);

        Mail::to($inviteMail)->send(new PractitionerInviteMail(
            clientInvite: $invitation,
            practitionerId: $practitioner->id,
            practitionerName: $practitioner->name,
            practitionerEmail: $practitioner->email,
        ));




    }
}
