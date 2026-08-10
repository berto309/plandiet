<?php


namespace Plandiet\App\Tools\Compliance\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use MealRatingResource;
use Plandiet\App\Invites\Enums\ClientInviteStatusEnum;

class CompliancesThisWeekResource extends JsonResource
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
            'phone' => $this->phone,
            'conditions' => $this->conditions,
            'meal_plans_count' => $this->meal_plans_count,
            'meal_plans_percentage' => $this->meal_plans_percentage,
        ];
    }
}
