<?php declare(strict_types=1);


namespace Plandiet\App\Analytics;

use Illuminate\Support\Collection;
use Plandiet\App\Meal\Models\MealPlan;

final class GetClientMealPlanForTheDay
{
    public function get(): ?Collection
    {
       return MealPlan::where('client_id', auth()->id())
            ->where('created_at', now()->toDateString())
            ->with('items')
            ->first();
    }
}
