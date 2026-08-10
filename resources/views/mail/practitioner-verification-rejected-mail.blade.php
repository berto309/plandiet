@component('mail::message')
    # ⚠️ Verification Unsuccessful

    Hello **{{ $practitionerName }}**,

    Thank you for submitting your practitioner details and documents.
    After reviewing your information, we were unable to complete your verification.


    @if($reason)
        ## Reason
        **{{ $reason }}**
    @endif


    Warm regards,
    **{{ config('app.name') }}**
@endcomponent
