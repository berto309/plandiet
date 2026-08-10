<?php

namespace Plandiet\App\Users\Practitioner\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum VerificationStatusEnum: string
{
    use InteractsWithEnums;

    case UNDER_REVIEW = "under review";
    case VERIFIED = "verified";
    case REJECTED = "rejected";
    case SUSPENDED = "suspended";
}
