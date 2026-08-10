<?php

namespace App\Http\Controllers\Analytics\Practitioner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Users\Practitioner\Actions\ListPractitioners;

class PractitionersOverviewController extends Controller
{

    public function __invoke(Request $request): Response
    {
        $practitioners = (new ListPractitioners())->get();

        return inertia('admin/analytics/AdminDashboardPage', [
            'practitioners' => $practitioners,
        ]);
    }


}
