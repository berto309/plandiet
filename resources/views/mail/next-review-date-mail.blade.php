@component('mail::message')
# Next Review Date

Hello **{{ $clientName }}**,


Your next appointment with {{ $practitionerName  }} is on {{ \Carbon\Carbon::parse($nextReviewDate)->toDateTimeString() }}


Warm regards,
<br/> **{{ config('app.name') }}**
@endcomponent
