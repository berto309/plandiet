<?php


namespace App\Http\Controllers\Tools\Compliance;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Meal\Actions\FilterMealHistoryByDate;
use Plandiet\App\Meal\Actions\GetMealPlanStreak;
use Plandiet\App\Tools\Compliance\Actions\GetPractitionerComplianceThisWeek;
use Plandiet\App\Tools\Compliance\Actions\GetTargetNutritionCompliance;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\RuleEditor\Resources\NutritionRuleResource;

class PractitionerComplianceController extends Controller
{

    public function index(): Response
    {

        return inertia('practitioner/tools/compliance/PractitionerCompliancePage', [
            'practitionerCompliance' => app(GetPractitionerComplianceThisWeek::class)->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $client): Response
    {

        return inertia('practitioner/tools/compliance/PractitionerClientCompliancePage', [
            'client' => new UserResource($client->load('clientPractitioner', 'clientHealthProfile')),
            'clientComplianceTargets' => app(GetTargetNutritionCompliance::class)->get(id: $client->id),
            'streak' => app(GetMealPlanStreak::class)->get(id: $client->id),
            'mealHistory' => fn(Request $request) => $request->date ? app(FilterMealHistoryByDate::class)->get(id: $client->id, date: $request->date) :
                app(FilterMealHistoryByDate::class)->get(id: $client->id)
        ]);
    }

}
