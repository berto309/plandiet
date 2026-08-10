<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Plandiet\App\Tools\RuleEditor\Enums\RuleTemplateCategoryEnum;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class RuleTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $name1 = 'Diabetes: carb limit per meal';
        $name2 = 'Diabetes: low glycaemic index preference';
        $name3 = 'Diabetes + weight loss: tighter carb limit';
        $name4 = 'Hypertension: sodium limit per meal';
        $name5 = 'Hypertension: daily sodium ceiling';
        $name6 = 'Hypertension: potassium-rich foods boost';
        $name7 = 'High cholesterol: saturated fat daily limit';
        $name8 = 'High cholesterol: fibre target';
        $name9 = 'Allergy: exclude tree nuts';
        $name10 = 'Allergy: exclude peanuts';
        $name11 = 'IBS: low FODMAP diet';
        $name12 = 'CKD: phosphorus limit';
        $name13 = 'CKD: protein restriction';
        $lte = OperatorEnum::LESS_THAN_OR_EQUAL_TO->value;

        $templates = [

            // ── Type 2 Diabetes ─────────────────────────────────────────────

            [
                'name'               => $name1,
                'slug'               => Str::slug($name1),
                'condition_tag'      => 'diabetes_t2',
                'nutrient'           => 'carbs_g',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 45,
                'unit'               => 'g',
                'constraint_type'    => 'hard',
                'priority'           => 'high',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Limiting carbohydrates per meal helps manage post-prandial blood glucose in T2DM.',
                'evidence_source'    => 'ADA Standards of Medical Care in Diabetes 2024',
            ],
            [
                'name'               => $name2,
                'slug'               => Str::slug($name2),
                'condition_tag'      => 'diabetes_t2_weight_loss',
                'nutrient'           => 'carbs_g',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 40,
                'unit'               => 'g',
                'constraint_type'    => 'hard',
                'priority'           => 'high',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Further carb reduction supports both glycaemic control and caloric deficit.',
                'evidence_source'    => 'NHS England Diabetes Pathway 2024',
            ],
            [
                'name'               => $name3,
                'slug'               => Str::slug($name3),
                'condition_tag'      => 'diabetes_t2',
                'nutrient'           => 'glycaemic_index',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 55,
                'unit'               => 'GI',
                'constraint_type'    => 'soft',
                'priority'           => 'medium',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Low-GI foods produce a slower rise in blood glucose.',
                'evidence_source'    => 'Diabetes UK Dietary Guidance 2023',
            ],

            // ── Hypertension ─────────────────────────────────────────────────
            [
                'name'               => $name4,
                'slug'               => Str::slug($name4),
                'condition_tag'      => 'hypertension',
                'nutrient'           => 'sodium_mg',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 600,
                'unit'               => 'mg',
                'constraint_type'    => 'hard',
                'priority'           => 'high',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Sodium restriction is a first-line non-pharmacological intervention for hypertension.',
                'evidence_source'    => 'NICE Hypertension Guideline NG136',
            ],
            [
                'name'               => $name5,
                'slug'               => Str::slug($name5),
                'condition_tag'      => 'hypertension',
                'nutrient'           => 'sodium_mg_daily',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 1500,
                'unit'               => 'mg',
                'constraint_type'    => 'hard',
                'priority'           => 'critical',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Total daily sodium below 1500 mg associated with significant BP reduction.',
                'evidence_source'    => 'American Heart Association 2024',
            ],
            [
                'name'               => $name6,
                'slug'               => Str::slug($name6),
                'condition_tag'      => 'hypertension',
                'nutrient'           => 'potassium_mg',
                'is_active'           => fake()->boolean(),
                'operator'           => 'gte',
                'default_value'      => 3500,
                'unit'               => 'mg',
                'constraint_type'    => 'soft',
                'priority'           => 'medium',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Higher dietary potassium helps counteract sodium effects on blood pressure.',
                'evidence_source'    => 'WHO Guidelines on Potassium Intake 2012',
            ],

            // ── High Cholesterol ─────────────────────────────────────────────
            [
                'name'               => $name7,
                'slug'               => Str::slug($name7),
                'condition_tag'      => 'hypercholesterolaemia',
                'nutrient'           => 'sat_fat_g',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 15,
                'unit'               => 'g',
                'constraint_type'    => 'hard',
                'priority'           => 'high',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Reducing saturated fat lowers LDL cholesterol.',
                'evidence_source'    => 'NICE Cardiovascular Risk Guideline CG181',
            ],
            [
                'name'               => $name8,
                'slug'               => Str::slug($name8),
                'condition_tag'      => 'hypercholesterolaemia',
                'nutrient'           => 'fibre_g',
                'is_active'           => fake()->boolean(),
                'operator'           => 'gte',
                'default_value'      => 30,
                'unit'               => 'g',
                'constraint_type'    => 'soft',
                'priority'           => 'medium',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Soluble fibre binds cholesterol in the gut and reduces LDL.',
                'evidence_source'    => 'British Heart Foundation Dietary Guidance',
            ],

            // ── Nut Allergy ──────────────────────────────────────────────────
            [
                'name'               => $name9,
                'slug'               => Str::slug($name9),
                'condition_tag'      => 'allergy_nuts',
                'nutrient'           => 'tree_nuts',
                'is_active'           => fake()->boolean(),
                'operator'           => 'exclude',
                'default_value'      => null,
                'unit'               => null,
                'constraint_type'    => 'hard',
                'priority'           => 'critical',
                'category'           => RuleTemplateCategoryEnum::ALLERGY->value,
                'clinical_rationale' => 'Tree nut exclusion is mandatory for nut-allergic individuals.',
                'evidence_source'    => 'Anaphylaxis Campaign UK',
            ],
            [
                'name'               => $name10,
                'slug'               => Str::slug($name10),
                'condition_tag'      => 'allergy_peanuts',
                'nutrient'           => 'peanuts',
                'is_active'           => fake()->boolean(),
                'operator'           => 'exclude',
                'default_value'      => null,
                'unit'               => null,
                'constraint_type'    => 'hard',
                'priority'           => 'critical',
                'category'           => RuleTemplateCategoryEnum::ALLERGY->value,
                'clinical_rationale' => 'Peanut exclusion mandatory for peanut-allergic individuals.',
                'evidence_source'    => 'BSACI Peanut Allergy Guidelines',
            ],

            // ── IBS ──────────────────────────────────────────────────────────
            [
                'name'               => $name11,
                'slug'               => Str::slug($name11),
                'condition_tag'      => 'ibs',
                'nutrient'           => 'fodmap_level',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 2,
                'unit'               => 'g',
                'constraint_type'    => 'soft',
                'priority'           => 'high',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Low-FODMAP diet reduces fermentable carbohydrate load and IBS symptoms.',
                'evidence_source'    => 'Monash University FODMAP Guidelines 2023',
            ],

            // ── CKD ──────────────────────────────────────────────────────────
            [
                'name'               => $name12,
                'slug'               => Str::slug($name12),
                'condition_tag'      => 'ckd',
                'nutrient'           => 'phosphorus_mg',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 800,
                'unit'               => 'mg',
                'constraint_type'    => 'hard',
                'priority'           => 'critical',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Phosphorus restriction prevents hyperphosphataemia in CKD.',
                'evidence_source'    => 'KDIGO CKD-MBD Guideline 2017',
            ],
            [
                'name'               => $name13,
                'slug'               => str::slug($name13),
                'condition_tag'      => 'ckd',
                'nutrient'           => 'protein_g',
                'is_active'           => fake()->boolean(),
                'operator'           => $lte,
                'default_value'      => 50,
                'unit'               => 'g',
                'constraint_type'    => 'hard',
                'priority'           => 'critical',
                'category'           => RuleTemplateCategoryEnum::CHRONIC_CONDITION->value,
                'clinical_rationale' => 'Protein restriction slows CKD progression in non-dialysis patients.',
                'evidence_source'    => 'KDIGO CKD Guideline 2024',
            ],
        ];

        DB::table('rule_templates')->insert($templates);

    }
}
