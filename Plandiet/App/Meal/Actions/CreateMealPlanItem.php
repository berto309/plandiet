<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Actions;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;

final class CreateMealPlanItem
{
    public function create(array $data): MealPlanItem
    {
        return MealPlanItem::create($data);
    }
}
