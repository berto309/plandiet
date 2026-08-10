<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Plandiet\App\Invites\Models\ClientInvite;

class PractitionerInviteMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $tries = 3;


    /**
     * Create a new message instance.
     */
    public function __construct(
        public ClientInvite $clientInvite,
        public int $practitionerId,
        public string $practitionerName,
        public string $practitionerEmail
    )
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Invitation to Join " . config('app.name') .  " as my Client",
            from: $this->practitionerEmail
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {


        return new Content(
            markdown: 'mail.practitioner-invite-mail',
            with: [
                'invitedName' => $this->clientInvite->invited_name,
                'expires_at' => Carbon::parse($this->clientInvite->expires_at)->toDateTimeString(),
                'inviteUrl' => route('client.invite', [
                    'inviteId' => $this->clientInvite->id,
                    'practitionerId' => $this->practitionerId,
                    'token' => $this->clientInvite->token
                ])
            ]
        );
    }



    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
