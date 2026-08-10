<?php

namespace Plandiet\App\Users\Practitioner\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PractitionerClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'client' => new UserResource($this->whenLoaded('user')),
            'clinical_notes' => $this->clinical_notes,
            'status' => $this->status,
            'next_review_date' => $this->next_review_date,
            'created_at' => $this->created_at,
        ];
    }
}
