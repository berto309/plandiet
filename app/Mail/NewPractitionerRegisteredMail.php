<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewPractitionerRegisteredMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $tries = 3;


    /**
     * Create a new message instance.
     */
    public function __construct(
        public mixed $practitionerId,
        public string $practitionerName,
        public string $practitionerEmail,
        public string $createdAt
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
            subject: "New practitioner registered",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {


        return new Content(
            markdown: 'mail.new-practitioner-registered-mail',
            with: [
                'practitionerName' => $this->practitionerName,
                'practitionerEmail' => $this->practitionerEmail,
                'createdAt' => $this->createdAt,
                'url' => route('practitioners.show', $this->practitionerId),
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
