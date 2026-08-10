<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }


    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Model::unguard();

        Model::preventLazyLoading(!app()->isProduction());

        JsonResource::withoutWrapping();

        Relation::enforceMorphMap([
            'user' => \App\Models\User::class
        ]);

//        Password::defaults(fn (): ?Password => app()->isProduction()
//            ? Password::min(8)
//                ->mixedCase()
//                ->letters()
//                ->numbers()
//                ->uncompromised()
//            : null,
//        );
    }
}
