<?php


namespace App\Http\Controllers\Analytics\Practitioner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Users\Practitioner\Actions\GetPractitionerDashboardAnalytics;

class PractitionerDashboardController extends Controller
{

    public function __invoke(): Response
    {
        $practitionerDashboardAnalytics = app(GetPractitionerDashboardAnalytics::class)->getAnalytics();

        return inertia('practitioner/analytics/PractitionerDashboardPage', [
            'practitioner_analytics' => $practitionerDashboardAnalytics,
        ]);
    }


}
