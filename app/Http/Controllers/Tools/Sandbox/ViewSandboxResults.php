<?php

namespace App\Http\Controllers\Tools\Sandbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\Sandbox\Actions\GetSandboxTestResults;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Tools\Sandbox\Resources\RuleSandboxTestResource;
use Plandiet\App\Users\Practitioner\Actions\GetPractitionerClientsList;

class ViewSandboxResults extends Controller
{

    public function __invoke(): Response
    {
        return inertia('practitioner/tools/sandbox/SandboxTestResultsPage', [
            'sandBoxResults' => RuleSandboxTestResource::collection(app(GetSandboxTestResults::class)->get())
        ]);
    }
}
