<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Actions;
use Illuminate\Support\Carbon;
use Plandiet\App\Meal\Models\MealPlan;

final class GetMealPlanStreak
{
    public function get(int $id): int
    {
        $dates = MealPlan::where('client_id', $id)
            ->orderByDesc('created_at')
            ->pluck('created_at')
            ->map(fn($d) => Carbon::parse($d)->toDateString())
            ->unique()
            ->values();

        $streak = 0;
        $expected = now()->toDateString();

        foreach ($dates as $date) {
            if ($date === $expected) {
                $streak++;
                $expected = Carbon::parse($expected)->subDay()->toDateString();
            } else {
                break;
            }
        }

        return $streak;

    }
}
