<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class DeleteNutritionRule
{
    public function delete(NutritionRule $nutritionRule): void
    {
        $nutritionRule->delete();
    }
}
