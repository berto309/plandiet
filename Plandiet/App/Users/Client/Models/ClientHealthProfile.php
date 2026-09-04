<?php

namespace Plandiet\App\Users\Client\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientHealthProfile extends Model
{


    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
}
