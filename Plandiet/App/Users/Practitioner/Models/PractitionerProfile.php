<?php

namespace Plandiet\App\Users\Practitioner\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Plandiet\App\Users\Practitioner\Enums\ProfessionalTitleEnum;
use Plandiet\App\Users\Practitioner\Enums\RegulatorEnum;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;

class PractitionerProfile extends Model
{
    protected $casts = [
        'professional_title' => ProfessionalTitleEnum::class,
        'regulator' => RegulatorEnum::class,
        'verification_status' => VerificationStatusEnum::class,
    ];

    public function statusUpdater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }


}
