@component('mail::message')
    # Your Verification Is Complete

    Hello **{{ $practitionerName }}**,

    We’re pleased to inform you that your practitioner details and uploaded documents have been successfully reviewed and verified.
    Your account is now fully activated.

    You can now:
    - Access your practitioner dashboard
    - Manage and onboard clients
    - Update your profile
    - Begin offering your services through the platform

    We’re excited to have you working with us and supporting clients through your expertise.

    If you need any help getting started, feel free to reach out.

    Warm regards,
    **{{ config('app.name') }}** Team
@endcomponent
