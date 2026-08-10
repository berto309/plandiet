<?php

namespace Plandiet\App\Users\Practitioner\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class PractitionerClient extends Model
{


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
