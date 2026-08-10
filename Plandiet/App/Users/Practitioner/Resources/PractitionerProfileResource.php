<?php

namespace Plandiet\App\Users\Practitioner\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PractitionerProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'professional_title' => $this->professional_title,
            'credential_type' => $this->credential_type,
            'registration_number' => $this->registration_number,
            'regulator' => $this->regulator,
            'country_of_practice' => $this->country_of_practice,
            'practice_name' => $this->practice_name,
            'bio' => $this->bio,
            'website' => $this->website,
            'verification_status' => $this->verification_status->value,
            'verified_at' => $this->verified_at,
            'verified_by' => new UserResource($this->whenLoaded('statusUpdater')),
            'rejection_reason' => $this->rejection_reason,
            'suspension_reason' => $this->suspension_reason,
            'insurance_expiry' => $this->insurance_expiry,
            'created_at' => $this->created_at
        ];
    }
}
