<?php


namespace Plandiet\App\Meal\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Plandiet\App\Invites\Enums\ClientInviteStatusEnum;

class MealPlanItemResource extends JsonResource
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
            'rating' => new MealRatingResource($this->whenLoaded('mealRating')),
            'meal_type' => $this->meal_type,
            'meal_order' => $this->meal_order,
            'description' => $this->description,
            'ingredients' => $this->ingredients,
            'recipe_status' => $this->recipe_status,
            'prep_minutes' => $this->prep_minutes,
            'calories' => $this->calories,
            'protein_g' => $this->protein_g,
            'carbs_g' => $this->carbs_g,
            'fat_g' => $this->fat_g,
            'sat_fat_g' => $this->sat_fat_g,
            'fibre_g' => $this->fibre_g,
            'sodium_mg' => $this->sodium_mg,
            'why_chosen' => $this->why_chosen,
            'rules_matched' => $this->rules_matched,
            'candidates_rejected' => $this->candidates_rejected,
            'created_at' => $this->created_at
        ];
    }
}
