<?php

namespace Plandiet\App\Users\Client\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientHealthProfileResource extends JsonResource
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
            'conditions' => is_null($this->conditions) ?  [] : json_decode($this->conditions, true),
            'allergies' =>  is_null($this->allergies) ? [] : json_decode($this->allergies, true),
            'intolerances' => $this->intolerances,
            'primary_goal' => $this->primary_goal,
            'height_cm' =>  $this->height_cm,
            'weight_kg' => $this->weight_kg,
            'activity_level' => $this->activity_level,
            'target_calories' => $this->target_calories,
            'target_protein_g' => $this->target_protein_g,
            'target_carbs_g' => $this->target_carbs_g,
            'target_fat_g' => $this->target_fat_g,
            'target_fibre_g' => $this->target_fibre_g,
            'target_sodium_mg' => $this->target_sodium_mg,
            'cuisine_preferences' => is_null($this->cuisine_preferences) ? [] : json_decode($this->cuisine_preferences, true),
            'dietary_preferences' => is_null($this->dietary_preferences) ? [] : json_decode($this->dietary_preferences, true),
            'meals_per_day' => $this->meals_per_day,
            'max_cooking_minutes' => $this->max_cooking_minutes,
        ];
    }
}
