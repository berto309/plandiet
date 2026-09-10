<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Actions;
use Plandiet\App\Meal\Enums\MealPlanStatusEnum;
use Plandiet\App\Meal\Models\MealPlan;
use Plandiet\App\Meal\Models\MealPlanItem;
use Plandiet\App\Meal\Services\MealRecommendationService;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;

final class GenerateMealPlan
{


    public function generate(): MealPlan
    {
        $client = auth()->user();

        $healthProfile = $client->clientHealthProfile;
        abort_if(! $healthProfile, 422, 'Please complete your health profile with practitioner before generating a meal plan.');

        // Load all active rules for this client (set by their practitioner)
        $rules = NutritionRule::where('client_id', $client->id)
            ->where('is_active', true)
            ->orderByRaw("FIELD(priority, 'critical','high','medium','low')")
            ->get();

        $start = now();

        // Run the neuro symbolic pipeline
        $result = app(MealRecommendationService::class)->generatePlan(
            profile: $healthProfile,
            rules:   $rules,
            options: [
                'meals_per_day'       => $healthProfile->meals_per_day,
                'cuisine_preferences' => json_decode($healthProfile->cuisine_preferences) ?? [],
                'max_cooking_minutes' => $healthProfile->max_cooking_minutes,
            ]
        );

        $generationMs = now()->diffInMilliseconds($start);

//        $plan = DB::transaction(function () use ($client, $result, $generationMs, $rules) {
            // Remove existing plan for today if regenerating
            $existingMealPlan = MealPlan::where('client_id', $client->id)
                ->whereDate('created_at', now());

                if($existingMealPlan) {
                    $existingMealPlan->delete();
                }

            $planData = [
                'client_id'         => $client->id,
                'practitioner_id'   => $client->practitionerRelationship?->practitioner_id,
                'total_calories'    => $result['totals']['calories'],
                'total_protein_g'   => $result['totals']['protein_g'],
                'total_carbs_g'     => $result['totals']['carbs_g'],
                'total_fat_g'       => $result['totals']['fat_g'],
                'total_fibre_g'     => $result['totals']['fibre_g'],
                'total_sodium_mg'   => $result['totals']['sodium_mg'],
                'rules_applied'     => $rules->pluck('id'),
                'rules_violated'    => json_encode($result['near_misses'] ?? []),
                'generation_model'  => config('services.anthropic.model'),
//                'generation_ms'     => $generationMs,
                'status'            => MealPlanStatusEnum::GENERATED,
            ];

            $plan = app(CreateMealPlan::class)->create($planData);

            foreach ($result['meals'] as $mealData) {
                 $data = array_merge($mealData, ['meal_plan_id' => $plan->id ,'client_id' => $client->id]);
                app(CreateMealPlanItem::class)->create($data);
            }

            return $plan->load('mealPlanItems');

    }

}
