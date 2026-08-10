<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;
use Plandiet\Infrastructure\Enums\OperatorEnum;

class NutritionRuleSeeder extends Seeder
{
    public function run(): void
    {
        $sarah  = User::where('email', 'sarah@plandiet.com')->first();
        $amir   = User::where('email', 'amir@plandiet.com')->first();
        $fatima = User::where('email', 'fatima@plandiet.com')->first();
        $marcus = User::where('email', 'marcus@plandiet.com')->first();
        $lin    = User::where('email', 'lin@plandiet.com')->first();

        $exclude = OperatorEnum::EXCLUDE->value;
        $hardConstraint = NutritionRuleConstraintTypeEnum::HARD->value;
        $high = NutritionRulePriorityEnum::HIGH->value;

        // ── Fatima's rules (T2DM + nut allergy, set by Sarah) ───────────────
        $this->createFromTemplate('Diabetes + weight loss: tighter carb limit', $fatima, $sarah, [
            'value'             => 40,  // Sarah tightened from default 45
            'practitioner_note' => 'Fatima on weight-loss goal, lowering carb ceiling per NHS Q2 guidance.',
        ]);

        $this->createFromTemplate('Allergy: exclude tree nuts', $fatima, $sarah);
        $this->createFromTemplate('Allergy: exclude peanuts', $fatima, $sarah);

        $this->createFromTemplate('Diabetes: low glycaemic index preference', $fatima, $sarah);

        NutritionRule::firstOrCreate(
            ['client_id' => $fatima->id, 'name' => 'Fatima: exclude pork'],
            [
                'client_id'       => $fatima->id,
                'practitioner_id' => $sarah->id,
                'name'            => 'Fatima: no pork',
                'nutrient'        => 'pork',
                'operator'        => $exclude,
                'value'           => null,
                'unit'            => null,
                'constraint_type' => $hardConstraint,
                'priority'        => 'critical',
                'applies_when'    => json_encode(['meal_type' => 'all']),
                'is_active'       => true,
                'practitioner_note' => 'Client requires pork is excluded.',
                'version'         => 1,
            ]
        );

        // ── Marcus's rules (hypertension + high cholesterol, set by Sarah) ──
        $this->createFromTemplate('Hypertension: sodium limit per meal', $marcus, $sarah, [
            'value'             => 550, // Sarah tightened from 600
            'practitioner_note' => 'Marcus on ramipril — keeping sodium lower than default template.',
        ]);

        $this->createFromTemplate('Hypertension: daily sodium ceiling', $marcus, $sarah);
        $this->createFromTemplate('High cholesterol: saturated fat daily limit', $marcus, $sarah);
        $this->createFromTemplate('High cholesterol: fibre target', $marcus, $sarah);
        $this->createFromTemplate('Hypertension: potassium-rich foods boost', $marcus, $sarah);

        // ── Lin's rules (CKD + shellfish allergy, set by Amir) ──────────────
        $this->createFromTemplate('CKD: phosphorus limit', $lin, $amir);
        $this->createFromTemplate('CKD: protein restriction', $lin, $amir, [
            'value'             => 50,
            'practitioner_note' => 'Lin stage 3 CKD, non-dialysis. Strict protein control essential.',
        ]);

        NutritionRule::firstOrCreate(
            ['client_id' => $lin->id, 'name' => 'CKD: exclude shellfish (allergy)'],
            [
                'client_id'       => $lin->id,
                'practitioner_id' => $amir->id,
                'name'            => 'CKD: exclude shellfish (allergy)',
                'nutrient'        => 'shellfish',
                'operator'        => $exclude,
                'value'           => null,
                'unit'            => null,
                'constraint_type' => $hardConstraint,
                'priority'        => 'critical',
                'applies_when'    => json_encode(['meal_type' => 'all']),
                'is_active'       => true,
                'version'         => 1,
            ]
        );

        NutritionRule::firstOrCreate(
            ['client_id' => $lin->id, 'name' => 'CKD: exclude dairy (intolerance)'],
            [
                'client_id'       => $lin->id,
                'practitioner_id' => $amir->id,
                'name'            => 'CKD: exclude dairy (intolerance)',
                'nutrient'        => 'dairy',
                'operator'        => $exclude,
                'value'           => null,
                'unit'            => null,
                'constraint_type' => $hardConstraint,
                'priority'        => $high,
                'applies_when'    => json_encode(['meal_type' => 'all']),
                'is_active'       => true,
                'version'         => 1,
            ]
        );
    }

    private function createFromTemplate(
        string $templateName,
        User $client,
        User $practitioner,
        array $overrides = []
    ): void {
        $template = RuleTemplate::where('name', $templateName)->first();
        if (! $template) {
            return;
        }

        NutritionRule::firstOrCreate(
            ['client_id' => $client->id, 'name' => $template->name],
            array_merge([
                'client_id'        => $client->id,
                'practitioner_id'  => $practitioner->id,
                'rule_template_id' => $template->id,
                'name'             => $template->name,
                'nutrient'         => $template->nutrient,
                'operator'         => $template->operator,
                'value'            => $template->default_value,
                'unit'             => $template->unit,
                'constraint_type'  => $template->constraint_type,
                'priority'         => $template->priority,
                'applies_when'     => json_encode(['meal_type' => 'all']),
                'is_active'        => true,
                'version'          => 1,
            ], $overrides)
        );
    }
}
