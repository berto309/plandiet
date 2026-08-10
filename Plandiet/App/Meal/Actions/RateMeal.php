<?php declare(strict_types=1);

namespace Plandiet\App\Meal\Actions;

use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Meal\Models\MealRating;

final class RateMeal
{
    public function rate(MealPlanItem $meal, array $ratingData)
    {
        if((int)$ratingData['rating'] === 1 && $meal->rating === 1){

            MealPlanItem::where('id', $meal->id)->update(['rating' => 0]);
        }

        $meal->update($ratingData);
    }
}
