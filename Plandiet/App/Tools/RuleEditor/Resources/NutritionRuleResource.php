<?php

namespace Plandiet\App\Tools\RuleEditor\Resources;


use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NutritionRuleResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
            'nutrient' => $this->nutrient,
            'operator' => $this->operator->value,
            'operator_translation' => $this->operator->operatorTranslation(),
            'value' => $this->value,
            'unit' => $this->unit,
            'constraint_type' => $this->constraint_type->value,
            'priority' => $this->priority,
            'applies_when' => $this->applies_when,
            'is_active' => $this->is_active,
            'practitioner_note' => $this->practitioner_note,
          'client' => new UserResource($this->whenLoaded('client')),
          'practitioner' => new UserResource($this->whenLoaded('practitioner')),

        ];
    }
}
