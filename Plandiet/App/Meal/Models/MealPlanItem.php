<?php

namespace Plandiet\App\Meal\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Plandiet\App\Meal\Enums\MealTypeEnum;

class MealPlanItem extends Model
{
    protected $casts = [
        'meal_type' => MealTypeEnum::class,
        'candidates_rejected' => 'array',
        'rules_matched' => 'array',
        'was_swapped' => 'boolean',
    ];

    public function mealRating(): HasOne
    {
        return $this->hasOne(MealRating::class);

    }
}
