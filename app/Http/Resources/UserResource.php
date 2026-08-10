<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Plandiet\App\Tools\RuleEditor\Resources\NutritionRuleResource;
use Plandiet\App\Users\Client\Resources\ClientHealthProfileResource;
use Plandiet\App\Users\Practitioner\Resources\PractitionerClientResource;
use Plandiet\App\Users\Practitioner\Resources\PractitionerProfileResource;

class UserResource extends JsonResource
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
          'name' => $this->name,
          'email' => $this->email,
          'role' => $this->role,
            'status' => $this->status,
            'phone' => $this->phone,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'post_code' => $this->post_code,
            'address' => $this->address,
            'city' => $this->city,
            'created_at' => $this->created_at,
            'practitioner_profile' => new PractitionerProfileResource($this->whenLoaded('practitionerProfile')),
            'client_health_profile' => new ClientHealthProfileResource($this->whenLoaded('clientHealthProfile')),
            'nutrition_rules' => NutritionRuleResource::collection($this->whenLoaded('nutritionRules')),
            'practitioner_client' => new PractitionerClientResource($this->whenLoaded('clientPractitioner')),
            'practitioner_documents' => MediaResource::collection($this->whenLoaded('media')),

        ];
    }
}
