<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Plandiet\App\Meal\Actions\FilterMealHistoryByDate;

class MealHistoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $client = auth()->user();

        return inertia('client/meals/MealHistoryPage',[
            'mealHistory' => fn(Request $request) => $request->date ? app(FilterMealHistoryByDate::class)->get(id: $client->id, date: $request->date) :
                                                         app(FilterMealHistoryByDate::class)->get(id: $client->id)
        ]);
    }
}
