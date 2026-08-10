<?php

namespace Plandiet\App\Tools\Sandbox\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class RuleSandboxTestResource extends JsonResource
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
            'practitioner' => new UserResource($this->whenLoaded('practitioner')),
            'client' => new UserResource($this->whenLoaded('client')),
            'test_profile' => $this->test_profile,
            'rule_set_snapshot' => $this->rule_set_snapshot,
            'candidate_meals' => $this->candidate_meals,
            'results' => $this->results,
            'pass_count' => $this->pass_count,
            'fail_count' => $this->fail_count,
            'created_at' => $this->created_at
        ];
    }
}
