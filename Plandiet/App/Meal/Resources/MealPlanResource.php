<?php


namespace Plandiet\App\Meal\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Plandiet\App\Invites\Enums\ClientInviteStatusEnum;

class MealPlanResource extends JsonResource
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
            'total_calories' => $this->total_calories,
            'total_protein_g' => $this->total_protein_g,
            'total_carbs_g' => $this->total_carbs_g,
            'total_fat_g' => $this->total_fat_g,
            'total_fibre_g' => $this->total_fibre_g,
            'total_sodium_mg' => $this->total_sodium_mg,
            'status' => $this->status->value,
            'meal_plan_items' => MealPlanResource::collection($this->whenLoaded('mealPlanItems')),
            'created_at' => $this->created_at
        ];
    }
}
