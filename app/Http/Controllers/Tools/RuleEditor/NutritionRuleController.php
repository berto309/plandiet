<?php

namespace App\Http\Controllers\Tools\RuleEditor;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tools\RuleEditor\Actions\ListNutritionRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Plandiet\App\Audits\Actions\CreateNutritionRuleHistory;
use Plandiet\App\Tools\RuleEditor\Actions\CreateNutritionRule;
use Plandiet\App\Tools\RuleEditor\Actions\DeleteNutritionRule;
use Plandiet\App\Tools\RuleEditor\Actions\EditNutritionRule;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;
use Plandiet\App\Tools\RuleEditor\Requests\NutritionRuleRequest;
use Plandiet\App\Tools\RuleEditor\Resources\NutritionRuleResource;
use Plandiet\App\Tools\RuleEditor\Services\ConflictDetector;
use Plandiet\App\Users\Practitioner\Actions\GetPractitionerClientsList;
use Plandiet\Infrastructure\Enums\OperatorEnum;


class NutritionRuleController extends Controller
{

    public function index(): Response
    {
        $nutritionRules = NutritionRuleResource::collection((new ListNutritionRules())->list());

        return inertia('practitioner/tools/rule-editor/NutritionRulesListPage', [
            'nutritionRules' => $nutritionRules
        ]);
    }


    public function create(): Response
    {
        return inertia('practitioner/tools/rule-editor/CreateNutritionRulePage', [
            'ruleOperators' => OperatorEnum::toArray(),
            'ruleUnits' => NutritionRuleUnitEnum::toArray(),
            'ruleConstraintTypes' => NutritionRuleConstraintTypeEnum::toArray(),
            'rulePriorities' => NutritionRulePriorityEnum::toArray(),
            'practitionerClientsList' => app(GetPractitionerClientsList::class)->list(),
            'ruleTemplateList' => RuleTemplate::get()->toArray(),
        ]);
    }

    public function store(NutritionRuleRequest $request, CreateNutritionRule $createNutritionRule, CreateNutritionRuleHistory $createNutritionRuleHistory, ConflictDetector $conflictDetector): RedirectResponse
    {
        $validated = $request->validated();
        $incomingRule = new NutritionRule($validated);

        $existingRules = NutritionRule::where('client_id', $request->client_id)
            ->get();

        // Check for conflicts
        $conflictReport = $conflictDetector->check($incomingRule, $existingRules);

        if($conflictReport->hasAnyConflictsToReport() && !$request->boolean('force')){

            inertia()->flash([
                'alert' => [
                    'title' => 'Conflict Detected',
                    'type' => 'danger',
                    'message'         => 'This rule conflicts with one or more existing rules. '
                        . 'Review the conflict report and adjust the rule values to resolve the conflict. ',
                    'data' => [
                        'conflict_report' => $conflictReport->toArray(),
                        'incoming_rule'   => $incomingRule->toArray(),
                    ]
                ]
            ]);

            return back();
        }

        DB::transaction(function () use ($request, $createNutritionRule, $createNutritionRuleHistory, $validated) {

            $rule = $createNutritionRule->create(data: $validated);

            $historyData = [
                'nutrition_rule_id' => $rule->id,
                'changed_by' => auth()->id(),
                'action' => 'created',
                'new_state' => json_encode($request->safe()->except(['created_at', 'updated_at'])),
            ];

            $createNutritionRuleHistory->create(data: $historyData);
        });

        inertia()->flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Nutrition rule created.'
            ]
        ]);

        return redirect()->route('nutrition-rules.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(NutritionRule $nutrition_rule): Response
    {
        $nutritionRule = new NutritionRuleResource($nutrition_rule);

        return inertia('practitioner/tools/rule-editor/EditNutritionRulePage', [
            'nutritionRule' => $nutritionRule->load('client:id,name'),
            'ruleOperators' => OperatorEnum::toArray(),
            'ruleUnits' => NutritionRuleUnitEnum::toArray(),
            'ruleConstraintTypes' => NutritionRuleConstraintTypeEnum::toArray(),
            'rulePriorities' => NutritionRulePriorityEnum::toArray(),
            'practitionerClientsList' => app(GetPractitionerClientsList::class)->list(),
            'ruleTemplateList' => RuleTemplate::get()->toArray(),
        ]);
    }


    public function update(NutritionRuleRequest $request, NutritionRule $nutritionRule, EditNutritionRule $editNutritionRule, CreateNutritionRuleHistory $createNutritionRuleHistory, ConflictDetector $conflictDetector): RedirectResponse
    {

        $oldSnapshot = [
            'name'            =>  $nutritionRule->getOriginal('name'),
            'nutrient'        => $nutritionRule->getOriginal('nutrient'),
            'operator'        => $nutritionRule->getOriginal('operator')->value,
            'value'           => $nutritionRule->getOriginal('value'),
            'unit'            => $nutritionRule->getOriginal('unit')->value,
            'priority'        => $nutritionRule->getOriginal('priority')->value,
            'constraint_type' => $nutritionRule->getOriginal('constraint_type')->value,
        ];

        $prospective = new NutritionRule(array_merge(
            $nutritionRule->toArray(),
            $request->validated(),
        ));

        $prospective->id = $nutritionRule->id; // preserve ID so conflict check can exclude

        $otherRules = NutritionRule::where('client_id', $request->client_id)
            ->where('id', '!=', $nutritionRule->id)
            ->get();

        $conflictReport = $conflictDetector->check($prospective, $otherRules);


        if($conflictReport->hasAnyConflictsToReport() && !$request->boolean('force')){

            inertia()->flash([
                'alert' => [
                    'title' => 'Conflict Detected',
                    'type' => 'danger',
                    'message'         => 'This rule conflicts with one or more existing rules. '
                        . 'Review the conflict report and adjust the rule values to resolve the conflict. ',
                    'data' => [
                        'conflict_report'  => $conflictReport->toArray(),
                        'current_rule'     => $oldSnapshot,
                        'incoming_rule' => array_intersect_key(
                            $prospective->toArray(),
                            array_flip(['nutrient','operator','value','unit','priority','constraint_type'])
                        ),
                    ]
                ]
            ]);

            return back();
        }



        DB::transaction(function () use ($request, $nutritionRule, $editNutritionRule, $createNutritionRuleHistory, $oldSnapshot) {


            $editNutritionRule->update(nutritionRule:$nutritionRule, data: $request->validated());



            $historyData = [
                'nutrition_rule_id' => $nutritionRule->id,
                'changed_by' => auth()->id(),
                'action' => 'updated',
                'previous_state' => json_encode($oldSnapshot),
                'new_state' => json_encode($request->validated()),
            ];

            $createNutritionRuleHistory->create(data: $historyData);
        });

        inertia()->flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Nutrition rule updated.'
            ]
        ]);

        return redirect()->route('nutrition-rules.index');
    }


    public function destroy(NutritionRule $nutrition_rule): RedirectResponse
    {
        DB::transaction(function () use ($nutrition_rule) {
            (new DeleteNutritionRule())->delete($nutrition_rule);
        });

        inertia()->flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Nutrition rule deleted.'
            ]
        ]);

        return back();
    }


}
