@component('mail::message')
    # Welcome Aboard

    Hello **{{ $userName }}**,

    Thank you for completing your registration — I’m delighted to welcome you as a client.


    ### What Happens Next
    Your profile is now active, and I can begin preparing your personalised nutrition rules.
    Your first review/appointment is on {{ \Carbon\Carbon::parse($reviewDate)->toDateTimeString() }}.

    If anything changes or you need assistance, you can contact me at any time.



    ### Stay Connected
    You now have access to your client dashboard, where you can:
    - Update personal information
    - Generate meals after nutrition rules have been assigned to you.
    - View your compliance to the meals generated.
    - View next review/appointment date

    I’m looking forward to working with you and supporting your wellbeing journey.

    Warm regards,
    {{ $practitionerName }} **{{ config('app.name') }}**
@endcomponent
