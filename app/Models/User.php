<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Plandiet\App\Invites\Models\ClientInvite;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;
use Plandiet\App\Users\Practitioner\Models\PractitionerClient;
use Plandiet\App\Users\Practitioner\Models\PractitionerProfile;
use Plandiet\Infrastructure\Enums\GenderEnum;
use Plandiet\Infrastructure\Enums\UserRoleEnum;
use Plandiet\Infrastructure\Enums\UserStatusEnum;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable(['name', 'email', 'phone', 'role', 'status', 'date_of_birth', 'gender', 'password', 'created_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, InteractsWithMedia;

    protected function attributes(): array
    {
        return [
            'role' => UserRoleEnum::CLIENT->value
        ];

    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' =>  UserRoleEnum::class,
            'status' => UserStatusEnum::class,
            'gender' => GenderEnum::class,
        ];
    }

    public function practitionerProfile(): HasOne
    {
        return $this->hasOne(PractitionerProfile::class);
    }

    public function clientHealthProfile(): HasOne
    {
        return $this->hasOne(ClientHealthProfile::class);
    }

    public function nutritionRules(): HasMany
    {
        return $this->hasMany(NutritionRule::class, 'client_id');
    }

    public function clientInvites(): HasMany
    {
        return $this->hasMany(ClientInvite::class);
    }

    public function clientPractitioner(): HasOne
    {
        return $this->hasOne(PractitionerClient::class);
    }

    public function mealPlans(): HasMany
    {
        return $this->hasMany(MealPlan::class, 'client_id');
    }

    public function mealPlanItems(): HasMany
    {
        return $this->hasMany(MealPlanItem::class, 'client_id');
    }
}
