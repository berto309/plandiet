@component('mail::message')

    Hello,

    You are receiving this email because {{$clientName}} has accepted your invitation to be your client after creating
    a personal account on the platform. Your first review/appointment is on {{ \Carbon\Carbon::parse($reviewDate)->toDateTimeString() }} where you can
    begin to create a health profile for your client during the meeting.

    @component('mail::button', ['url' => $url])
        Create Client health profile
    @endcomponent



    Warm regards, <br/>
     **{{ config('app.name') }}** Team
@endcomponent
