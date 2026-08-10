<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class EditNutritionRule
{
    public function update(NutritionRule $nutritionRule, array $data): void
    {
        $nutritionRule->update($data);
    }
}
