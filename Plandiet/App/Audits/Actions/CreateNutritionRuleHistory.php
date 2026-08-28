<?php declare(strict_types=1);


namespace Plandiet\App\Audits\Actions;

use Plandiet\App\Audits\Models\NutritionRuleHistory;

final class CreateNutritionRuleHistory
{
    public function create(array $data): NutritionRuleHistory
    {
        return NutritionRuleHistory::create($data);
    }
}
