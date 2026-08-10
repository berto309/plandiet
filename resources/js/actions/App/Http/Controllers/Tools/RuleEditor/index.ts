import RuleTemplateController from './RuleTemplateController'
import NutritionRuleController from './NutritionRuleController'
const RuleEditor = {
    RuleTemplateController: Object.assign(RuleTemplateController, RuleTemplateController),
NutritionRuleController: Object.assign(NutritionRuleController, NutritionRuleController),
}

export default RuleEditor