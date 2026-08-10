<?php

namespace App\Http\Controllers\Analytics\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Analytics\GetAdminDashboardAnalytics;

class AdminDashboardController extends Controller
{

    public function __invoke(): Response
    {
        $analytics = app(GetAdminDashboardAnalytics::class)->getAnalytics();

        return inertia('admin/analytics/AdminDashboardPage', [
            'analytics' => $analytics,
        ]);
    }


}
