<?php declare(strict_types=1);


namespace Plandiet\App\Users\Practitioner\Actions;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

final class GetPractitionerDashboardAnalytics
{
    public function getAnalytics(): array
    {

        $user = auth()->user();

        $totalClients = DB::table('practitioner_clients')->where('practitioner_id', $user->id)->count();
        $nutritionRulesGenerated = NutritionRule::where('practitioner_id', $user->id)->count();
        $mealPlansAcrossClients = MealPlan::where('practitioner_id', $user->id)->count();
        $clientReviewThisWeekCount = DB::table('practitioner_clients')->where('practitioner_id', $user->id)->whereBetween('next_review_date', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $mealPlansGeneratedByClientsToday = MealPlan::where('practitioner_id', $user->id)->whereDate('created_at',now())->count();

        $recentClients = DB::table('practitioner_clients')
            ->join('users', 'practitioner_clients.user_id', '=', 'users.id')
            ->where('practitioner_id', $user->id)
            ->orderByDesc('practitioner_clients.created_at')
            ->select([
            'users.id',
            'users.name',
            'users.email',
            'practitioner_clients.status',
            'practitioner_clients.created_at',
        ])->take(5)->get()->toArray();

        $clientsReviewThisWeek = DB::table('practitioner_clients')
            ->join('users', 'practitioner_clients.user_id', '=', 'users.id')
            ->where('practitioner_id', $user->id)
            ->whereBetween('practitioner_clients.next_review_date', [now()->startOfWeek(), now()->endOfWeek()])
            ->select([
            'users.id',
            'users.name',
            'users.email',
                'practitioner_clients.status',
            'practitioner_clients.next_review_date',
        ])->take(5)->get()->toArray();

        return [
            'stats' => [
                'meal_plans_generated_by_clients_today' => $mealPlansGeneratedByClientsToday,
                'total_clients' => $totalClients,
                'total_nutrition_rules_generated' => $nutritionRulesGenerated,
                'total_meal_plans_across_clients' => $mealPlansAcrossClients,
                'total_client_reviews_this_week' => $clientReviewThisWeekCount
            ],
            'client_reviews_this_week' => $clientsReviewThisWeek,
            'recent_clients' => $recentClients
        ];
    }
}
