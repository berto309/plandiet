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

//    protected function conditions(): Attribute
//    {
//        return Attribute::make(
//            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
//        );
//    }
//
//
//    protected function allergies(): Attribute
//    {
//        return Attribute::make(
//            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
//        );
//    }
//
//    protected function intolerances(): Attribute
//    {
//        return Attribute::make(
//            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
//        );
//    }
//    protected function dietaryPreferences()
//    {
//        return Attribute::make(
//            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
//        );
//    }
//
//    protected function cuisinePreferences(): Attribute
//    {
//        return Attribute::make(
//            get: fn (?string $value) => is_null($value) ? [] : json_decode($value, true),
//        );
//    }
}
