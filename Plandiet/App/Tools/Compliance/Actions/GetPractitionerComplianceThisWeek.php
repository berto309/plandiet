<?php declare(strict_types=1);


namespace Plandiet\App\Tools\Compliance\Actions;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;

final class GetPractitionerComplianceThisWeek
{
    public function get(): ?LengthAwarePaginator
    {
        return PractitionerClient::with([
            'user' => function ($query) {
                $query
                    ->select('id', 'name', 'email', 'phone')
                    ->withCount([
                        'mealPlans as meal_plans_count' => function ($query) {
                            $query->whereBetween('created_at', [
                                now()->startOfWeek(),
                                now()->endOfWeek(),
                            ]);
                        },
                    ])
                    ->with([
                        'clientHealthProfile' => function ($query) {
                            $query
                                ->select(
                                    'user_id',
                                    'conditions'
                                );
                        },
                    ]);
            },
        ])
            ->where('practitioner_id', auth()->id())
            ->orderByDesc('practitioner_clients.id')
            ->paginate()
            ->through(function ($practitionerClient) {
                $user = $practitionerClient->user;
                $count = $user->meal_plans_count ?? 0;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'conditions' => is_null($user->clientHealthProfile->conditions) ? [] : $user->clientHealthProfile->conditions,
                    'meal_plans_count' => $count,
                    'meal_plans_percentage' => min(
                        round(($count / 7) * 100),
                        100
                    ),
                ];
            });
    }
}
