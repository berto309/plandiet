<?php

namespace Plandiet\App\Meal\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Plandiet\App\Meal\Enums\MealPlanStatusEnum;

class MealPlan extends Model
{
    protected $casts = [
        'status' => MealPlanStatusEnum::class,
    ];

    public function mealPlanItems(): HasMany
    {
        return $this->hasMany(MealPlanItem::class);
    }
}
