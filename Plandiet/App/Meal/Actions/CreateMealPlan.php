<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Actions;


use Plandiet\App\Meal\Models\MealPlan;

final class CreateMealPlan
{
    public function create(array $data): MealPlan
    {
        return MealPlan::create($data);
    }
}
