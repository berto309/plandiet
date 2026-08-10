<?php

namespace App\Http\Controllers\Meal;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Plandiet\App\Meal\Actions\RateMeal;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;

class MealRatingController extends Controller
{


    public function __invoke(Request $request, $meal): RedirectResponse
    {
        $mealItem = MealPlanItem::findOrFail($meal);
        abort_if($mealItem->client_id !== auth()->id(), 404);

        $ratingData = $request->validate([
            'rating'          => ['required','integer','min:1','max:5'],
//            'comment'         => ['nullable', 'string'. 'max:500'],
//            'would_eat_again' => ['required', 'boolean'],
        ]);

         app(RateMeal::class)->rate($mealItem, $ratingData);

         return back();


    }


}
