<?php

namespace App\Http\Controllers\Tools\RuleEditor;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tools\RuleEditor\Actions\ListNutritionRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
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

    public function store(NutritionRuleRequest $request, CreateNutritionRule $createNutritionRule): RedirectResponse
    {

        DB::transaction(function () use ($request, $createNutritionRule) {
            $createNutritionRule->create(data: $request->validated());
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


    public function update(NutritionRuleRequest $request, NutritionRule $nutritionRule, EditNutritionRule $editNutritionRule): RedirectResponse
    {
        DB::transaction(function () use ($request, $nutritionRule, $editNutritionRule) {
            $editNutritionRule->update(nutritionRule:$nutritionRule, data: $request->validated());
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
