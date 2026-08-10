<?php

namespace App\Http\Controllers\Meal;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Plandiet\App\Meal\Actions\SwapMeal;
use Plandiet\App\Meal\Exceptions\NoSuitableMealFoundDuringSwap;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;

class MealSwapController extends Controller
{

    public function __invoke(Request $request,  $meal): RedirectResponse
    {
        $mealItem = MealPlanItem::findOrFail($meal);

        abort_if($mealItem->client_id !== auth()->id(), 404);

        try {
            app(SwapMeal::class)->swap($mealItem);
        } catch(NoSuitableMealFoundDuringSwap $e) {

            inertia()->flash([
                'toast' => [
                    'type' => 'danger',
                    'message' => $e->getMessage(),
                ]
            ]);
        }

        return back();
    }

}
