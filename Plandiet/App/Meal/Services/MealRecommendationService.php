<?php declare(strict_types=1);

namespace Plandiet\App\Meal\Services;


use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Plandiet\App\Meal\Exceptions\MealGenerationException;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleConstraintTypeEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRulePriorityEnum;
use Plandiet\App\Tools\RuleEditor\Enums\NutritionRuleUnitEnum;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;
use Plandiet\Infrastructure\Enums\OperatorEnum;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Exceptions\PrismException;


class MealRecommendationService
{
    private string $model;
    private int    $maxTokens;
    private int    $candidatesPerSlot;


    public function __construct()
    {
        $this->model             = config('prism.providers.gemini.model');
        $this->maxTokens         = config('prism.meal_max_tokens',         4096);
        $this->candidatesPerSlot = 2;
    }


    public function generatePlan(
        ClientHealthProfile $profile,
        Collection          $rules,
        array               $options = []
    ): array {
        $hardRules = $rules->where('constraint_type', NutritionRuleConstraintTypeEnum::HARD->value);
        $softRules = $rules->where('constraint_type', NutritionRuleConstraintTypeEnum::SOFT->value);


        $candidates = $this->generateCandidates($profile, $rules, $options);

        $filtered = $this->applyHardRules($candidates, $hardRules);

        $scored = $this->scoreCandidates($filtered, $softRules, $profile);

        $selected = $this->selectBestPerSlot($scored, $options['meals_per_day'] ?? '3');

        if (empty($selected)) {
            throw new MealGenerationException(
                reason: 'No meals survived rule filtering. Try relaxing dietary constraints or expanding cuisine preferences.'
            );
        }

        return [
            'meals'      => $selected,
            'totals'     => $this->computeTotals($selected),
            'near_misses'=> $this->detectNearMisses($selected, $hardRules),
        ];
    }

    /**
     *
     * Step 1: Neural — generate meal candidates
     */
    private function generateCandidates(
        ClientHealthProfile $profile,
        Collection          $rules,
        array               $options
    ): array {
        $userPrompt = $this->buildUserPrompt($profile, $rules, $options);

        try {

            $response = Prism::text()
                ->using(Provider::Gemini, $this->model)
                ->withMaxTokens($this->maxTokens)
                ->withSystemPrompt(view('prompts.meal_system')->render())
                ->withPrompt($userPrompt)
                ->asText();

            $raw = $response->text ?? '';

        } catch (PrismException $e) {
            // Prism wraps provider errors (rate limits, auth, timeouts) in PrismException
            Log::error('Prism API error in MealRecommendationService', [
                'message' => $e->getMessage(),
                'model'   => $this->model,
                'client'  => $profile->client_id,
            ]);
            throw new MealGenerationException($e->getMessage(), $e);
        }

        return $this->parseCandidates($raw);
    }

    /**
     * Build the user-facing prompt string.
     * Identical logic to the old buildCandidatePrompt() but now a private
     * helper that feeds withPrompt() instead of being embedded in the payload.
     */
    private function buildUserPrompt(
        ClientHealthProfile $profile,
        Collection          $rules,
        array               $options
    ): string {
        $conditions   = implode(', ', $profile->conditions ?? []);
        $allergies    = implode(', ', $profile->allergies ?? []);
        $intolerances = implode(', ', $profile->intolerances ?? []);
        $cuisines     = implode(', ', $options['cuisine_preferences'] ?? []);
        $mealsPerDay  = $options['meals_per_day']  ?? 3;
        $maxCookMins  = $options['max_cooking_minutes'] ?? 40;
        $kcal = NutritionRuleUnitEnum::KCAL->value;
        $g = NutritionRuleUnitEnum::G->value;
        $gi = NutritionRuleUnitEnum::GI->value;
        $mg = NutritionRuleUnitEnum::MG->value;

        $ruleLines = $rules->map(fn ($r) => sprintf(
            '  - %s %s %s %s [%s · %s]',
            $r->nutrient,
            strtoupper($r->operator->value),
            $r->value ?? 'EXCLUDE',
            $r->unit->value  ?? '',
            strtoupper($r->constraint_type->value),
            strtoupper($r->priority->value)
        ))->implode("\n");

        $slots = match ($mealsPerDay) {
            4     => 'breakfast, lunch, dinner, snack',
            5     => 'breakfast, morning_snack, lunch, afternoon_snack, dinner',
            default => 'breakfast, lunch, dinner',
        };

        return <<<PROMPT
Generate {$this->candidatesPerSlot} candidate meals for EACH of these slots: {$slots}.

CLIENT PROFILE
--------------
Conditions       : {$conditions}
Allergies        : {$allergies}  <-- NEVER include any of these
Intolerances     : {$intolerances}  <-- NEVER include any of these
Goal             : {$profile->primary_goal}
Cuisine prefs    : {$cuisines}
Max cooking time : {$maxCookMins} minutes

DAILY NUTRITION TARGETS
------------------------
Calories  : {$profile->target_calories} {$kcal}
Protein   : {$profile->target_protein_g} {$g}
Carbs     : {$profile->target_carbs_g} {$g}
Fat       : {$profile->target_fat_g} {$g}
Fibre     : {$profile->target_fibre_g} {$g}
Sodium    : {$profile->target_sodium_mg} {$mg}

ACTIVE RULES (the symbolic engine enforces these — generate diverse options)
-----------------------------------------------------------------------------
{$ruleLines}

REQUIRED JSON SHAPE (return nothing else):
{
  "candidates": [
    {
      "meal_type":    "breakfast",
      "name":         "...",
      "description":  "...",
      "ingredients":  "...",
      "recipe_steps": "...",
      "prep_minutes": 15,
      "calories":     320,
      "protein_g":    22,
      "carbs_g":      28,
      "fat_g":        11,
      "sat_fat_g":    3.2,
      "fibre_g":      5,
      "sodium_mg":    210,
      "why_chosen":   "Plain-language explanation for the client"
    }
  ]
}
PROMPT;
    }

    /**
     * Parse the raw JSON string from the LLM into a PHP array.
     * Identical logic to old service — strips accidental markdown fences.
     */
    private function parseCandidates(string $raw): array
    {
        // Strip any accidental markdown code fences the model might add
        $clean = preg_replace('/```(?:json)?\s*/', '', $raw);
        $clean = trim($clean ?? $raw);

        try {
            $data = json_decode($clean, true, 512, JSON_THROW_ON_ERROR);

            return $data['candidates'] ?? [];
        } catch (\JsonException $e) {
            Log::warning('MealRecommendationService: JSON parse failed', [
                'raw_excerpt' => substr($raw, 0, 400),
            ]);
            return [];
        }
    }

    /**
     * Step 2 — Filter candidates against HARD rules.
     * Any meal that fails even one hard rule is rejected.
     */
    private function applyHardRules(array $candidates, Collection $hardRules): array
    {
        return array_values(array_filter($candidates, function (array $meal) use ($hardRules): bool {
            foreach ($hardRules as $rule) {
                if (! $this->rulePass($meal, $rule)) {
                    Log::debug('Meal rejected by hard rule', [
                        'meal' => $meal['name'] ?? '?',
                        'rule' => $rule->name,
                    ]);
                    return false;
                }

            }
            return true;
        }));
    }

    /**
     * Evaluate a single rule against a single meal.
     */
    private function rulePass(array $meal, object $rule): bool
    {
        $key = $this->nutrientToKey($rule->nutrient);

        return match ($rule->operator) {
            OperatorEnum::LESS_THAN_OR_EQUAL_TO  => ((float) ($meal[$key] ?? 0)) <= (float) $rule->value,
            OperatorEnum::GREATER_THAN_OR_EQUAL_TO   => ((float) ($meal[$key] ?? 0)) >= (float) $rule->value,
            OperatorEnum::EQUAL_TO  => ((string) ($meal[$key] ?? '')) === (string) $rule->value,
            OperatorEnum::EXCLUDE  => ! $this->mealContains($meal, $rule->nutrient),
            OperatorEnum::REQUIRE => $this->mealContains($meal, $rule->nutrient),
            OperatorEnum::PRIORITIZE,  => true,   // soft signal only — never hard-fails
            default     => true,
        };
    }

    /**
     * Step 3 — Score surviving candidates against SOFT rules.
     * Higher score → more likely to be selected.
     */
    private function scoreCandidates(
        array      $candidates,
        Collection $softRules,
        ClientHealthProfile $profile
    ): array {
        foreach ($candidates as &$meal) {
            $score = 0.0;

            foreach ($softRules as $rule) {
                $key    = $this->nutrientToKey($rule->nutrient);
                $value  = (float) ($meal[$key] ?? 0);
                $weight = $this->priorityWeight($rule->priority->value);

                $score += match ($rule->operator) {
                    OperatorEnum::LESS_THAN_OR_EQUAL_TO  => $value <= (float) $rule->value
                        ? $weight
                        : 0.0,
                    OperatorEnum::GREATER_THAN_OR_EQUAL_TO  => $value >= (float) $rule->value
                        ? $weight
                        : max(0.0, $weight * ($value / max(1, (float) $rule->value))),
                    OperatorEnum::PRIORITIZE, OperatorEnum::REQUIRE => $this->mealContains($meal, $rule->nutrient)
                        ? $weight * 2.0
                        : 0.0,
                    default     => 0.0,
                };
            }

            // Bonus for cuisine preference match
            foreach ($profile->cuisine_preferences ?? [] as $cuisine) {
                if (stripos(($meal['description'] ?? '') . ' ' . ($meal['name'] ?? ''), $cuisine) !== false) {
                    $score += 5.0;
                }
            }

            $meal['_score'] = $score;
        }
        unset($meal);

        return $candidates;
    }

    /**
     * Step 4 — Select the highest-scoring candidate for each meal slot.
     */
    private function selectBestPerSlot(array $candidates, string|int $mealsPerDay): array
    {
        $bySlot   = collect($candidates)->groupBy('meal_type');
        $selected = [];
        $order    = 1;

        foreach ($bySlot as $slotCandidates) {
            /** @var array|null $best */
            $best = $slotCandidates->sortByDesc('_score')->first();

            if ($best) {
                unset($best['_score'], $best['_rejected_by']);
                $best['meal_order'] = $order++;
                $selected[]         = $best;
            }
        }

        return $selected;
    }

    /**
     * Step 5a — Sum totals across the day's selected meals.
     */
    private function computeTotals(array $meals): array
    {
        $sum = fn (string $key): float => array_sum(array_column($meals, $key));

        return [
            'calories'  => (int)   $sum('calories'),
            'protein_g' => round(  $sum('protein_g'), 1),
            'carbs_g'   => round(  $sum('carbs_g'),   1),
            'fat_g'     => round(  $sum('fat_g'),     1),
            'fibre_g'   => round(  $sum('fibre_g'),   1),
            'sodium_mg' => (int)   $sum('sodium_mg'),
        ];
    }

    /**
     * Step 5b — Flag meals within 10% of any hard limit (near-misses).
     */
    private function detectNearMisses(array $meals, Collection $hardRules): array
    {
        $nearMisses = [];

        foreach ($meals as $meal) {
            foreach ($hardRules as $rule) {
                if (! in_array($rule->operator->value, ['lte', 'gte'], true) || ! $rule->value) {
                    continue;
                }

                $key    = $this->nutrientToKey($rule->nutrient);
                $value  = (float) ($meal[$key] ?? 0);
                $limit  = (float) $rule->value;
                $margin = $limit > 0 ? abs($value - $limit) / $limit : 0;

                if ($margin < 0.10) {
                    $nearMisses[] = [
                        'meal'        => $meal['name']  ?? '',
                        'rule'        => $rule->name    ?? '',
                        'value'       => $value,
                        'limit'       => $limit,
                        'margin_pct'  => round($margin * 100, 1),
                    ];
                }
            }
        }

        return $nearMisses;
    }


    /** Map a rule nutrient name to the matching key in a meal array. */
    private function nutrientToKey(string $nutrient): string
    {
        return match ($nutrient) {
            'carbohydrates', 'carbs_g'     => 'carbs_g',
            'sodium', 'sodium_mg'          => 'sodium_mg',
            'protein', 'protein_g'         => 'protein_g',
            'saturated_fat', 'sat_fat_g'   => 'sat_fat_g',
            'fibre', 'fibre_g'             => 'fibre_g',
            'energy', 'calories'           => 'calories',
            default                        => $nutrient,
        };
    }

    /** Check whether a meal's name or ingredients contain a given ingredient token. */
    private function mealContains(array $meal, string $ingredient): bool
    {

        $haystack = strtolower(
            ($meal['name']        ?? '') . ' ' .
            ($meal['ingredients'] ?? '') . ' ' .
            ($meal['description'] ?? '')
        );

        return str_contains($haystack, strtolower($ingredient));
    }

    /** Return a numeric weight for a rule priority level. */
    private function priorityWeight(string $priority): float
    {
        return match ($priority) {
            NutritionRulePriorityEnum::CRITICAL->value => 20.0,
            NutritionRulePriorityEnum::HIGH->value     => 10.0,
            NutritionRulePriorityEnum::MEDIUM->value   =>  5.0,
            NutritionRulePriorityEnum::LOW->value     =>  2.0,
            default    =>  1.0,
        };
    }
}
