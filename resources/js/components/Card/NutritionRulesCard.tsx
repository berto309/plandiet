import React from 'react';
import {isCritical, isHigh, isLow, isMedium, isPractitioner, isSoft} from "@/types/enums";
import EmptyState from "@/components/State/EmptyState";
import {User} from "@/types/types";
import {Link, usePage} from "@inertiajs/react";
import NutritionRuleController from "@/actions/App/Http/Controllers/Tools/RuleEditor/NutritionRuleController";

const NutritionRulesCard = ({client}: {client: User}) => {
    const {auth} = usePage().props

    return (
        <div className="card">
            <div className="ch"><span className="ct">Active rules ({client.nutrition_rules.filter((r) => r.is_active).length})</span>

            </div>
            {client.nutrition_rules.length > 0 ?
                <div className="cb" style={{ padding:".6rem 1.2rem"}}>
                    <div className="md:grid grid-cols-2 gap-[0.5rem] space-y-4 md:space-y-0">
                        {client.nutrition_rules.map(nutritionRule => (
                            <Link href={NutritionRuleController.show(nutritionRule.id).url}
                                key={nutritionRule.id}
                                style={{ "background":`${nutritionRule.is_active ? 'var(--cream)' : 'ghostwhite'}`, "borderRadius":"0.6rem" , "padding":"0.55rem 0.75rem", "fontSize":"0.76rem"}}>
                                <div style={{"color":"var(--muted)"}}>{nutritionRule.name}</div>
                                <div style={{"fontWeight": "500", "color": "var(--danger)"}}>
                                    <div className="mb-1">
                                        <span className="uppercase">{nutritionRule.nutrient} {nutritionRule.operator_translation}</span> {nutritionRule.value}{nutritionRule.unit}
                                    </div>

                                    <div className="space-x-1">
                                        {isSoft(nutritionRule.constraint_type) ? <span title="constraint type" className="cursor-pointer badge bg-green-100 text-green-700 capitalize">{nutritionRule.constraint_type}</span> : <span title="constraint type" className="badge bg-red-100 text-red-700 capitalize">{nutritionRule.constraint_type}</span>}

                                        {isCritical(nutritionRule.priority) &&  <span title="priority" className="cursor-pointer badge bg-red-100 text-red-700 capitalize">{nutritionRule.priority}</span>}
                                        {isHigh(nutritionRule.priority) &&  <span title="priority" className="cursor-pointer badge bg-yellow-100 text-yellow-700 capitalize">{nutritionRule.priority}</span>}
                                        {isMedium(nutritionRule.priority) &&  <span title="priority" className="cursor-pointer badge bg-blue-100 text-blue-700 capitalize">{nutritionRule.priority}</span>}
                                        {isLow(nutritionRule.priority) &&  <span title="priority" className="cursor-pointer badge bg-gray-100 text-gray-700 capitalize">{nutritionRule.priority}</span>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                : <EmptyState emptyTitle="No active rules for client" />}
        </div>
    );
};

export default NutritionRulesCard;
