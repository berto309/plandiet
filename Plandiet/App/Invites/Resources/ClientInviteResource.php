<?php

namespace Plandiet\App\Invites\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Plandiet\App\Invites\Enums\ClientInviteStatusEnum;

class ClientInviteResource extends JsonResource
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
            'invited_name' => $this->invited_name,
            'email' => $this->email,
            'expires_at' => $this->expires_at,
            'status' =>  is_null($this->accepted_at) ? ClientInviteStatusEnum::PENDING->value : ClientInviteStatusEnum::ACCEPTED->value,
            'created_at' => $this->created_at
        ];
    }
}
