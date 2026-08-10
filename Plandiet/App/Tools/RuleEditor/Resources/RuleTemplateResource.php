<?php

namespace Plandiet\App\Tools\RuleEditor\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RuleTemplateResource extends JsonResource
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
            'slug' => $this->slug,
            'condition_tag' => $this->condition_tag,
            'nutrient' => $this->nutrient,
            'operator' => $this->operator,
            'operator_translation' => $this->operator->operatorTranslation(),
            'default_value' => $this->default_value,
            'unit' => $this->unit,
            'constraint_type' => $this->constraint_type,
            'category' => $this->category,
            'priority' => $this->priority,
            'clinical_rationale' => $this->clinical_rationale,
            'evidence_source' => $this->evidence_source,
            'is_active' => $this->is_active
        ];
    }
}
