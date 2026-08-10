<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Enums;

use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum ProfessionalTitleEnum: string
{
    use InteractsWithEnums;
    case REGISTERED_DIETICIAN = 'Registered Dietician';
    case REGISTERED_NUTRITIONIST = 'Registered Nutritionist';

    public function getCredentialType(): string
    {
        return match ($this) {
            self::REGISTERED_DIETICIAN => CredentialTypeEnum::RD->value,
            default => CredentialTypeEnum::RN->value,
        };
    }
}
