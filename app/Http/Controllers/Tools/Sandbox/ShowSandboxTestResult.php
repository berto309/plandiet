<?php

namespace App\Http\Controllers\Tools\Sandbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Tools\Sandbox\Resources\RuleSandboxTestResource;
use Plandiet\App\Users\Practitioner\Actions\GetPractitionerClientsList;

class ShowSandboxTestResult extends Controller
{


    public function __invoke(RuleSandboxTest $sandbox): Response
    {

        $selectedSandbox = $sandbox->load([
                'client:id,name,email,phone' => [
                    'clientHealthProfile:conditions,user_id']
        ]);


        return inertia('practitioner/tools/sandbox/SandboxTestResultPage', [
            'sandboxTest' => new RuleSandboxTestResource($selectedSandbox),
        ]);
    }
}
