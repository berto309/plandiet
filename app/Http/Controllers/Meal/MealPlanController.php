<?php

namespace App\Http\Controllers\Meal;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Plandiet\App\Meal\Actions\GenerateMealPlan;

class MealPlanController extends Controller
{

    public function __invoke(): RedirectResponse
    {
        app(GenerateMealPlan::class)->generate();

        inertia()->flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Meal plan generated.',
            ]
        ]);

        return redirect()->route('client.dashboard');
    }


}
