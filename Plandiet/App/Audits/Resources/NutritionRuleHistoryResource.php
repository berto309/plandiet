<?php


namespace Plandiet\App\Audits\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Plandiet\App\Tools\RuleEditor\Resources\NutritionRuleResource;

class NutritionRuleHistoryResource extends JsonResource
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
            'nutrition_rule' => new NutritionRuleResource($this->whenLoaded('nutritionRule')),
            'changed_by' => new UserResource($this->whenLoaded('user')),
            'action' => $this->action,
            'previous_state' => json_decode($this->previous_state),
            'new_state' => json_decode($this->new_state),
            'change_reason' => $this->change_reason,
            'created_at' => $this->created_at
        ];
    }
}
