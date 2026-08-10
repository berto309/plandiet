@component('mail::message')
    # You're Invited

    Hello **{{ $invitedName }}**,

    I hope you're keeping well.

    I'm reaching out to warmly invite you to join my practitioner client list. This link will expire on {{ $expires_at }}.
    By clicking the button below, you'll be securely added as a client within my system.


    If you have any questions or need help completing the form, I’m here to support you.

    @component('mail::button', ['url' => $inviteUrl])
        Join as a Client
    @endcomponent

    Warm regards,
    **{{ config('app.name') }}**
@endcomponent
