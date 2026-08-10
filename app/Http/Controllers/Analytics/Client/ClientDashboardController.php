<?php

namespace App\Http\Controllers\Analytics\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Analytics\GetClientMealPlanForTheDay;
use Plandiet\App\Users\Client\Actions\GetClientDashboardAnalytics;
use Plandiet\App\Users\Practitioner\Actions\ListPractitioners;

class ClientDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $clientDashboardAnalytics = app(GetClientDashboardAnalytics::class)->get();

        return inertia('client/analytics/ClientDashboardPage', [
            'client_dashboard_analytics' => $clientDashboardAnalytics,
        ]);
    }
}

