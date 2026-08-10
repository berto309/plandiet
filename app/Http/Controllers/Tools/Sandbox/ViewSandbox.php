<?php

namespace App\Http\Controllers\Tools\Sandbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Users\Practitioner\Actions\GetPractitionerClientsList;

class ViewSandbox extends Controller
{

    public function __invoke(): Response
    {
        return inertia('practitioner/tools/sandbox/SandboxPage', [
            'practitionerClientsList' => app(GetPractitionerClientsList::class)->list(),
            'clientNutritionRulesList' => inertia()->optional(
                fn(Request $request) => $request->client_id ? NutritionRule::where('client_id', $request->client_id)->get()->toArray() : []
            ),
            'sandboxTest' => inertia()->optional(fn() => RuleSandboxTest::where('practitioner_id', auth()->id())->latest()->first()),
        ]);
    }
}
