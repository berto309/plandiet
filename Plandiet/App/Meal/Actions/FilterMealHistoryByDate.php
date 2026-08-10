<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Actions;

use Plandiet\App\Meal\Models\MealPlanItem;

final class  FilterMealHistoryByDate
{
    public function get(int $id, ?string $date = null): array
    {



        if ($date === null) {
            return MealPlanItem::where('client_id', $id)->whereDate('created_at', today())->get()->toArray();
        }

        return MealPlanItem::where('client_id', $id)->whereDate('created_at', $date)->get()->toArray();
    }
}
