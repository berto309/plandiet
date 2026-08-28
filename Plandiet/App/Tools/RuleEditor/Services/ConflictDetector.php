<?php


namespace Plandiet\App\Tools\RuleEditor\Services;

use Illuminate\Support\Collection;
use Plandiet\App\Tools\RuleEditor\DTO\ConflictReport;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

/**
 * RuleConflictDetector
 *
 * Detects conflicts between a prospective (incoming/updated) rule and a
 * collection of existing active rules for the same client.
 *
 * Conflict taxonomy:
 *
 *   HARD CONFLICT   — The two rules are logically incompatible; no meal can
 *                     satisfy both simultaneously. Blocks save unless forced.
 *                     Examples:
 *                       carbs_g ≤ 40  vs  carbs_g ≥ 45   (impossible range)
 *                       tree_nuts EXCLUDE  vs  tree_nuts REQUIRE
 *
 *   SOFT CONFLICT   — The rules do not contradict but together create a very
 *                     narrow feasible space (< VIABLE_RANGE_WARN_PCT of the
 *                     nutrient's typical range). Warns but does not block.
 *                     Example:
 *                       carbs_g ≤ 25  +  carbs_g ≥ 20   (only 5g window)
 *
 *   NEAR CONFLICT   — One rule may dominate or make another redundant.
 *                     Informational only.
 *                     Example:
 *                       carbs_g ≤ 30  already exists and  carbs_g ≤ 45
 *                       is incoming — the existing rule is already stricter.
 *
 *   DIET FLAG CLASH — Two dietary flags that are mutually exclusive.
 *                     Example:  halal REQUIRE  +  pork REQUIRE
 *
 * The detector does NOT enforce clinical correctness of any individual rule —
 * that is the practitioner's professional responsibility. It only checks for
 * logical incompatibility between two or more rules in the same set.
 */
class ConflictDetector
{
    // ── Configuration ─────────────────────────────────────────────────────────

    /**
     * When the usable range for a nutrient falls below this fraction of the
     * nutrient's typical daily range, we emit a SOFT conflict warning.
     * e.g. carbs_g typical range 0–120g; 15% = 18g window triggers a warning.
     */
    private const VIABLE_RANGE_WARN_PCT = 0.15;

    /**
     * Typical daily range (min, max) for numeric nutrients (per meal unless
     * otherwise noted). Used only for the soft-conflict range check.
     */
    private const NUTRIENT_TYPICAL_RANGES = [
        'carbs_g' => [0, 120],
        'protein_g' => [0, 80],
        'fat_g' => [0, 70],
        'sat_fat_g' => [0, 25],
        'fibre_g' => [0, 25],
        'sodium_mg' => [0, 1500],
        'sodium_mg_daily' => [0, 3000],
        'potassium_mg' => [0, 2000],
        'phosphorus_mg' => [0, 600],
        'calcium_mg' => [0, 500],
        'iron_mg' => [0, 18],
        'calories' => [0, 900],
        'glycaemic_index' => [0, 100],
        'glycaemic_load' => [0, 40],
    ];

    /**
     * Pairs of dietary flag rules that can never coexist.
     * Format: [require_a, require_b] means REQUIRE a + REQUIRE b is impossible.
     * Format: [require_a, exclude_a] is already caught by the direct-conflict
     * check, so only cross-attribute pairs belong here.
     */
    private const DIETARY_FLAG_CLASHES = [
        ['halal', 'pork'],
        ['halal', 'shellfish'],   // shellfish not permitted under standard halal
        ['kosher', 'pork'],
        ['kosher', 'shellfish'],
        ['vegan', 'dairy'],
        ['vegan', 'eggs'],
        ['vegan', 'fish'],
        ['vegan', 'shellfish'],
        ['vegetarian', 'fish'],
        ['vegetarian', 'shellfish'],
        ['gluten_free', 'wheat'],
    ];

    /**
     * Binary-flag nutrients: EXCLUDE and REQUIRE on the same attribute clash.
     */
    private const FLAG_NUTRIENTS = [
        'tree_nuts', 'peanuts', 'shellfish', 'gluten', 'dairy', 'eggs', 'soy', 'fish',
        'sesame', 'wheat', 'halal', 'kosher', 'vegan', 'vegetarian', 'gluten_free',
        'pork', 'alcohol',
    ];

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Check a single incoming rule against a collection of existing rules.
     *
     * @param NutritionRule $incoming The rule being created or updated.
     * @param Collection $existing All OTHER active rules for this client.
     * @return ConflictReport
     */
    public function check(NutritionRule $incoming, Collection $existing): ConflictReport
    {
        $hard = [];
        $soft = [];
        $near = [];

        foreach ($existing as $rule) {
            // Only compare rules on the same nutrient key, plus cross-attribute
            // dietary flag clashes handled separately below.

            if ($rule->nutrient === $incoming->nutrient) {
                $result = $this->compareNumericOrFlag($incoming, $rule);
                $hard = array_merge($hard, $result['hard']);
                $soft = array_merge($soft, $result['soft']);
                $near = array_merge($near, $result['near']);
            }
        }

        // Cross-attribute dietary flag clash check
        $dietClashes = $this->checkDietaryFlagClashes($incoming, $existing);
        $hard = array_merge($hard, $dietClashes);

        return new ConflictReport($hard, $soft, $near, $existing);
    }

    /**
     * Run conflict detection across the entire rule set for a client,
     * checking every pair of rules against every other.
     *
     * @param Collection $rules All rules for a client.
     * @return ConflictReport
     */
    public function detectAll(Collection $rules): ConflictReport
    {
        $allHard = [];
        $allSoft = [];
        $allNear = [];

        $rulesArray = $rules->values()->toArray();
        $count = count($rulesArray);

        for ($i = 0; $i < $count; $i++) {
            for ($j = $i + 1; $j < $count; $j++) {
                $a = new NutritionRule((array)$rulesArray[$i]);
                $b = new NutritionRule((array)$rulesArray[$j]);
                $report = $this->check($a, collect([$b]));
                $allHard = array_merge($allHard, $report->hard);
                $allSoft = array_merge($allSoft, $report->soft);
                $allNear = array_merge($allNear, $report->near);
            }
        }

        return new ConflictReport($allHard, $allSoft, $allNear);
    }

    // ─── Private detection logic ──────────────────────────────────────────────

    /**
     * Compare two rules on the same nutrient key and classify any conflicts.
     */
    private function compareNumericOrFlag(
        NutritionRule $incoming,
        NutritionRule $existing
    ): array
    {
        $hard = [];
        $soft = [];
        $near = [];

        $key = $incoming->nutrient;

        // ── Binary flag nutrients (EXCLUDE / REQUIRE) ─────────────────────────
        if (in_array($key, self::FLAG_NUTRIENTS)) {
            if (
                $incoming->operator->value === 'exclude' && $existing->operator->value === 'require'
                || $incoming->operator->value === 'require' && $existing->operator->value === 'exclude'
            ) {
                $hard[] = $this->makeConflict(
                    type: 'direct_flag_clash',
                    level: 'hard',
                    incoming: $incoming,
                    existing: $existing,
                    message: "Cannot simultaneously REQUIRE and EXCLUDE '{$key}'. "
                    . "No meal can satisfy both constraints.",
                );
            } // REQUIRE + REQUIRE or EXCLUDE + EXCLUDE = redundant (near)
            elseif ($incoming->operator->value === $existing->operator->value) {
                $near[] = $this->makeConflict(
                    type: 'redundant_flag',
                    level: 'near',
                    incoming: $incoming,
                    existing: $existing,
                    message: "A rule already {$existing->operator->value}s '{$key}'. "
                    . "The new rule is redundant.",
                );
            }

            return compact('hard', 'soft', 'near');
        }

        // ── Numeric nutrients (lte / gte / eq) ────────────────────────────────
        $incomingOp = $incoming->operator->value;
        $existingOp = $existing->operator->value;
        $incomingVal = (float)$incoming->value;
        $existingVal = (float)$existing->value;

        // ── Case 1: lte + gte on same nutrient → range check ─────────────────
        if (
            ($incomingOp === 'lte' && $existingOp === 'gte') ||
            ($incomingOp === 'gte' && $existingOp === 'lte')
        ) {
            $upper = $incomingOp === 'lte' ? $incomingVal : $existingVal;
            $lower = $incomingOp === 'gte' ? $incomingVal : $existingVal;

            if ($lower > $upper) {
                // Impossible range: lower bound exceeds upper bound
                $hard[] = $this->makeConflict(
                    type: 'impossible_range',
                    level: 'hard',
                    incoming: $incoming,
                    existing: $existing,
                    message: "Impossible range for '{$key}': ≥ {$lower} and ≤ {$upper} "
                    . "cannot be satisfied simultaneously.",
                    detail: ['lower_bound' => $lower, 'upper_bound' => $upper, 'window' => 0],
                );
            } else {
                $window = $upper - $lower;
                $typRange = self::NUTRIENT_TYPICAL_RANGES[$key] ?? null;
                $typWindow = $typRange ? ($typRange[1] - $typRange[0]) : null;

                if ($typWindow && $window < ($typWindow * self::VIABLE_RANGE_WARN_PCT)) {
                    // Very narrow viable window — soft conflict
                    $soft[] = $this->makeConflict(
                        type: 'narrow_range',
                        level: 'soft',
                        incoming: $incoming,
                        existing: $existing,
                        message: "The usable range for '{$key}' is only {$window}"
                        . ($incoming->unit->value ? $incoming->unit->value : '')
                        . " ({$lower}–{$upper}). This may severely limit meal variety.",
                        detail: [
                            'lower_bound' => $lower,
                            'upper_bound' => $upper,
                            'window' => $window,
                            'typical_range_pct' => round(($window / $typWindow) * 100, 1),
                        ],
                    );
                }
                // If window is acceptable, no conflict — the range is valid.
            }

            return compact('hard', 'soft', 'near');
        }

        // ── Case 2: lte + lte on same nutrient → dominance check ─────────────
        if ($incomingOp === 'lte' && $existingOp === 'lte') {
            if ($existingVal <= $incomingVal) {
                // Existing rule is stricter or equal; incoming is redundant
                $near[] = $this->makeConflict(
                    type: 'dominated_upper_bound',
                    level: 'near',
                    incoming: $incoming,
                    existing: $existing,
                    message: "An existing rule already limits '{$key}' to ≤ {$existingVal}. "
                    . "The new ≤ {$incomingVal} rule is less restrictive and will have no effect.",
                );
            } else {
                // Incoming is stricter — existing rule becomes redundant
                $near[] = $this->makeConflict(
                    type: 'existing_dominated_upper_bound',
                    level: 'near',
                    incoming: $incoming,
                    existing: $existing,
                    message: "The new rule (≤ {$incomingVal}) is stricter than the existing rule "
                    . "(≤ {$existingVal}). The existing rule will have no effect.",
                );
            }
            return compact('hard', 'soft', 'near');
        }

        // ── Case 3: gte + gte → dominance check ──────────────────────────────
        if ($incomingOp === 'gte' && $existingOp === 'gte') {
            if ($existingVal >= $incomingVal) {
                $near[] = $this->makeConflict(
                    type: 'dominated_lower_bound',
                    level: 'near',
                    incoming: $incoming,
                    existing: $existing,
                    message: "An existing rule already requires '{$key}' to be ≥ {$existingVal}. "
                    . "The new ≥ {$incomingVal} rule is less restrictive and will have no effect.",
                );
            } else {
                $near[] = $this->makeConflict(
                    type: 'existing_dominated_lower_bound',
                    level: 'near',
                    incoming: $incoming,
                    existing: $existing,
                    message: "The new rule (≥ {$incomingVal}) is stricter than the existing rule "
                    . "(≥ {$existingVal}). The existing rule will have no effect.",
                );
            }
            return compact('hard', 'soft', 'near');
        }

        // ── Case 4: eq conflicts ──────────────────────────────────────────────
        if ($incomingOp === 'eq' || $existingOp === 'eq') {
            $eqVal = $incomingOp === 'eq' ? $incomingVal : $existingVal;
            $otherOp = $incomingOp === 'eq' ? $existingOp : $incomingOp;
            $otherVal = $incomingOp === 'eq' ? $existingVal : $incomingVal;

            $violated = match ($otherOp) {
                'lte' => $eqVal > $otherVal,
                'gte' => $eqVal < $otherVal,
                'eq' => abs($eqVal - $otherVal) > 0.001,
                default => false,
            };

            if ($violated) {
                $hard[] = $this->makeConflict(
                    type: 'eq_conflict',
                    level: 'hard',
                    incoming: $incoming,
                    existing: $existing,
                    message: "The exact-value rule ({$key} = {$eqVal}) conflicts with "
                    . "an existing {$otherOp} {$otherVal} constraint. "
                    . "The fixed value {$eqVal} cannot satisfy both.",
                );
            }
        }

        return compact('hard', 'soft', 'near');
    }

    /**
     * Check for cross-attribute dietary flag incompatibilities.
     */
    private function checkDietaryFlagClashes(
        NutritionRule $incoming,
        Collection    $existing
    ): array
    {
        $hard = [];

        if ($incoming->operator->value !== 'require') {
            return $hard;
        }

        $inKey = $incoming->nutrient;

        foreach (self::DIETARY_FLAG_CLASHES as [$flagA, $flagB]) {
            // Is the incoming rule one side of a known clash?
            $otherFlag = null;
            if ($inKey === $flagA) $otherFlag = $flagB;
            elseif ($inKey === $flagB) $otherFlag = $flagA;
            else continue;

            // Is there an existing REQUIRE rule for the other side?
            $clash = $existing->first(
                fn($r) => $r->nutrient === $otherFlag && $r->operator->value === 'require'
            );

            if ($clash) {
                $hard[] = $this->makeConflict(
                    type: 'dietary_flag_clash',
                    level: 'hard',
                    incoming: $incoming,
                    existing: $clash,
                    message: "Dietary incompatibility: REQUIRE '{$inKey}' and REQUIRE '{$otherFlag}' "
                    . "cannot coexist. These dietary requirements are mutually exclusive.",
                );
            }
        }

        return $hard;
    }

    /**
     * Build a standardised conflict entry array.
     */
    private function makeConflict(
        string        $type,
        string        $level,
        NutritionRule $incoming,
        NutritionRule $existing,
        string        $message,
        array         $detail = [],
    ): array
    {
        return [
            'type' => $type,
            'level' => $level,   // hard | soft | near
            'message' => $message,
            'incoming_rule' => [
                'nutrient' => $incoming->nutrient,
                'operator' => $incoming->operator->value,
                'value' => $incoming->value,
                'priority' => $incoming->priority->value,
                'constraint_type' => $incoming->constraint_type->value,
            ],
            'conflicting_rule' => [
                'id' => $existing->id,
                'nutrient' => $existing->nutrient,
                'operator' => $existing->operator->value,
                'value' => $existing->value,
                'priority' => $existing->priority->value,
                'constraint_type' => $existing->constraint_type->value,
                'label' => $existing->name ?? null,
            ],
            'detail' => $detail,
        ];
    }
}


