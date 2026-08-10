<?php

namespace App\Http\Controllers\Tools\RuleEditor;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Plandiet\App\Tools\RuleEditor\Actions\CreateRuleTemplate;
use Plandiet\App\Tools\RuleEditor\Actions\DeleteRuleTemplate;
use Plandiet\App\Tools\RuleEditor\Actions\EditRuleTemplate;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\App\Tools\RuleEditor\Enums\RuleTemplateCategoryEnum;
use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;
use Plandiet\App\Tools\RuleEditor\Requests\RuleTemplateRequest;
use Plandiet\App\Tools\RuleEditor\Resources\RuleTemplateResource;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class RuleTemplateController extends Controller
{

    public function index(): Response
    {
        $ruleTemplates = RuleTemplateResource::collection(RuleTemplate::orderByDesc('id')->paginate());

        return inertia("admin/tools/rule-template/RuleTemplateList",[
            "ruleTemplates" => $ruleTemplates,
        ]);
    }


    public function create(): Response
    {
        return inertia("admin/tools/rule-template/CreateRuleTemplatePage", [
            'ruleCategories' => RuleTemplateCategoryEnum::toArray(),
            'rulePriorities' => NutritionRulePriorityEnum::toArray(),
            'ruleConstraintTypes' => NutritionRuleConstraintTypeEnum::toArray(),
            'ruleUnits' => NutritionRuleUnitEnum::toArray(),
            'ruleOperators' => OperatorEnum::toArray(),
        ]);
    }


    public function store(RuleTemplateRequest $request, CreateRuleTemplate $ruleTemplateAction): RedirectResponse
    {

        $ruleTemplateAction->create($request->validated());

         inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Rule template created.'
        ]);

         return to_route('rule-templates.index');


    }


    public function show(RuleTemplate $ruleTemplate): Response
    {
        return inertia("admin/tools/rule-template/EditRuleTemplatePage",  [
            'ruleTemplate' => new RuleTemplateResource($ruleTemplate),
            'ruleCategories' => RuleTemplateCategoryEnum::toArray(),
            'rulePriorities' => NutritionRulePriorityEnum::toArray(),
            'ruleConstraintTypes' => NutritionRuleConstraintTypeEnum::toArray(),
            'ruleUnits' => NutritionRuleUnitEnum::toArray(),
            'ruleOperators' => OperatorEnum::toArray(),
        ]);
    }




    public function update(RuleTemplateRequest $request, EditRuleTemplate $editRuleTemplateAction, RuleTemplate $ruleTemplate): RedirectResponse
    {
        $editRuleTemplateAction->update(ruleTemplate: $ruleTemplate, data: $request->validated());

         inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Rule template updated.'
        ]);

         return back();

    }


    public function destroy(DeleteRuleTemplate $deleteRuleTemplateAction, RuleTemplate $ruleTemplate, string $id): RedirectResponse
    {
        $deleteRuleTemplateAction->delete(ruleTemplate: $ruleTemplate);

        inertia()->flash('toast', [
            'type' => 'success',
            'message' => 'Rule template deleted.'
        ]);

        return back();
    }
}
