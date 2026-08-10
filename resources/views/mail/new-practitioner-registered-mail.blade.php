@component('mail::message')
    # 🆕 New Practitioner Registration

    A new practitioner has just completed their registration. The practitioner has uploaded all required documents.
    You can review them in the admin portal.


    ## Practitioner Details
    - **Name:** {{ $practitionerName }}
    - **Email:** {{ $practitionerEmail }}
    - **Registered At:** {{ $createdAt }}

    @component('mail::button', ['url' => $url])
        View practitioner under review
    @endcomponent

    Thanks,
    **{{ config('app.name') }} **
@endcomponent
