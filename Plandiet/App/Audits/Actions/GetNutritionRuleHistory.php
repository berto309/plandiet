<?php declare(strict_types=1);


namespace Plandiet\App\Audits\Actions;

use Illuminate\Pagination\LengthAwarePaginator;
use Plandiet\App\Audits\Models\NutritionRuleHistory;

final class GetNutritionRuleHistory
{
    public function get(): ?LengthAwarePaginator
    {
        return NutritionRuleHistory::with('user:id,name', 'nutritionRule')->orderBy('created_at', 'desc')->paginate();
    }
}
