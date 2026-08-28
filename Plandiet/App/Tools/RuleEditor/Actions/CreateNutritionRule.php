<?php


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class CreateNutritionRule
{
    public function create(array $data): NutritionRule
    {
        return NutritionRule::create($data);
    }
}
