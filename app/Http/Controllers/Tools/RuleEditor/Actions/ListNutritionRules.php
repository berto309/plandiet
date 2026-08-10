<?php declare(strict_types=1);


namespace App\Http\Controllers\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class ListNutritionRules
{
    public function list(): \Illuminate\Pagination\LengthAwarePaginator
    {
        return NutritionRule::with('client:id,name')->orderByDesc('nutrition_rules.id')->paginate();
    }
}
