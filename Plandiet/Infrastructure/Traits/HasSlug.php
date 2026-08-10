<?php

declare(strict_types=1);


namespace Plandiet\Infrastructure\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    abstract public function sluggable(): string;

    public static function booted(): void
    {
        static::creating(function ($model): void {
            $attribute = $model->sluggable();
            $model->slug = Str::slug($model->getAttribute($attribute));
        });

        static::updating(function ($model): void {
            $attribute = $model->sluggable();

            $model->setAttribute($model->getRouteKeyName(), Str::slug($model->getAttribute($attribute)));
        });
    }
}
