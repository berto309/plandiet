<?php

namespace App\Http\Controllers\Tools\Sandbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Plandiet\App\Tools\Sandbox\Actions\RunSandbox;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Tools\Sandbox\Resources\RuleSandboxTestResource;

class RunSandboxController extends Controller
{

    public function __invoke(Request $request, RunSandbox $sandbox): RedirectResponse
    {
        $data = $request->validate(rules:[
            'client_id' => ['required', 'exists:users,id'],
            'include_draft_rules' => 'array',
        ], attributes: [
            'client_id' => 'client'
        ]);


//        $sandboxTestResult = $sandbox->run($data);
        $sandboxTestResult = RuleSandboxTest::first();

        inertia()->flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Sandbox run successfully.',
                'data' => new RuleSandboxTestResource($sandboxTestResult)
            ]
        ]);

        return back();
    }
}
