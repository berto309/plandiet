<?php declare(strict_types=1);

namespace Plandiet\App\Meal\Actions;

use Plandiet\App\Meal\Exceptions\NoSuitableMealFoundDuringSwap;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Meal\Services\MealRecommendationService;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class SwapMeal
{
    public function swap(MealPlanItem $item)
    {
        $user = auth()->user();

        $profile = $user->clientHealthProfile;
        $rules   = NutritionRule::where('client_id', $user->id)
            ->where('is_active', true)
            ->get();

        $result = app(MealRecommendationService::class)->generatePlan($profile, $rules, [
            'target_slot'        => $item->meal_type->value,
            'cuisine_preferences'=> $profile->cuisine_preferences ?? [],
            'max_cooking_minutes'=> $profile->max_cooking_minutes,
            'meals_per_day'      =>  1,
        ]);

        if (empty($result['meals'])) {
            throw new NoSuitableMealFoundDuringSwap(reason: 'No suitable swap found within your current rules.');
        }

        $newMealData = $result['meals'][0];
        $item->update(array_merge($newMealData, ['was_swapped' => true]));
    }
}
