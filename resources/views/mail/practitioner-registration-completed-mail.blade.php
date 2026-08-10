@component('mail::message')
# 🎉 Welcome to the Platform

Hello **{{ $practitionerName }}**,

Thank you for completing your practitioner registration and submitting your documents.
Your profile and uploaded materials have been received successfully.

Our team will now review your information and verify your documents.
This process typically takes **1–3 business days**.

Once verification is complete, you will receive:
- Confirmation that your practitioner account is fully activated and verified
- Access to your practitioner dashboard
- Ability to manage clients, upload resources, and update your profile

You will also be notified in case your application is rejected.

If any additional information is required, we’ll contact you directly. If you have questions or need assistance during the review process, feel free to reply to this email.

We’re excited to have you onboard.

Warm regards,
**{{ config('app.name') }}** Team
@endcomponent
