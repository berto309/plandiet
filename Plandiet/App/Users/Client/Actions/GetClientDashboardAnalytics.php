<?php declare(strict_types=1);


namespace Plandiet\App\Users\Client\Actions;
use App\Models\User;
use Plandiet\App\Meal\Actions\GetMealPlanStreak;
use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Tools\Compliance\Actions\GetTargetNutritionCompliance;

final class GetClientDashboardAnalytics
{
    public function get(): array
    {
        $user = auth()->user();

        return [
            'practitioner' => User::join('practitioner_clients', 'practitioner_clients.practitioner_id', '=', 'users.id')
                ->join('practitioner_profiles', 'practitioner_profiles.user_id', '=', 'users.id')
                ->where('practitioner_clients.user_id', $user->id)
                ->select(['users.name','users.email', 'practitioner_clients.next_review_date', 'practitioner_profiles.verification_status', 'regulator', 'professional_title', 'website'])->first(),
            'meals' => MealPlanItem::where('client_id', $user->id)->whereDate('created_at', now())->orderByRaw("FIELD(meal_type, 'breakfast', 'lunch', 'snack', 'dinner')")->get()->toArray(),
            'streak' => app(GetMealPlanStreak::class)->get($user->id),
            'compliance' => app(GetTargetNutritionCompliance::class)->get(id: $user->id)
        ];
    }
}
