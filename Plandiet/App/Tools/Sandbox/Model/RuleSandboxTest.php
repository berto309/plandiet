<?php

namespace Plandiet\App\Tools\Sandbox\Model;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RuleSandboxTest extends Model
{
    protected $casts = [
        'test_profile' => 'array',
        'rule_set_snapshot' => 'array',
        'candidate_meals' => 'array',
        'results' => 'array',
    ];

    public function practitioner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'practitioner_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
