<?php declare(strict_types=1);


namespace Plandiet\App\Analytics;
use App\Models\User;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Users\Practitioner\Enums\VerificationStatusEnum;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\UserRoleEnum;

final class GetAdminDashboardAnalytics
{
    public function getAnalytics(): array
    {

        $totalClients = User::where('role', UserRoleEnum::CLIENT->value)->count();
        $totalUnverifiedPractitioners = PractitionerProfile::where('verification_status', VerificationStatusEnum::UNDER_REVIEW)->count();
        $totalVerifiedPractitioners  = PractitionerProfile::where('verification_status', VerificationStatusEnum::VERIFIED)->count();
        $recentClients = User::where('role', UserRoleEnum::CLIENT->value)->take(5)->orderByDesc('users.id')->get()->toArray();
        $recentPractitionersUnderReview = User::where('role', UserRoleEnum::PRACTITIONER)
            ->whereHas('practitionerProfile', fn ($query) =>
            $query->where('verification_status', VerificationStatusEnum::UNDER_REVIEW->value)
            )
            ->with(['practitionerProfile' => fn ($query) =>
            $query->select([
                'user_id',
                'professional_title',
                'verification_status',
                'registration_number',
                'created_at',
            ])
            ])->take(5)->orderByDesc('users.id')->get()->toArray();

        return [
            'stats' => [
                'total_clients' => $totalClients,
                'total_unverified_practitioners' => $totalUnverifiedPractitioners,
                'total_verified_practitioners' => $totalVerifiedPractitioners,
                'meal_plans_generated_today' => MealPlan::whereDate('created_at', now())->count(),
            ],
            'recent_practitioners_under_review' => $recentPractitionersUnderReview,
            'recent_clients' => $recentClients
        ];
    }
}
