<?php


namespace Plandiet\App\Audits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

class NutritionRuleHistory extends Model
{
    protected $table = 'nutrition_rule_history';

    protected $casts = [
        'previous_state' => 'array',
        'new_state' => 'array',
    ];

    public function nutritionRule(): BelongsTo
    {
        return $this->belongsTo(NutritionRule::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
