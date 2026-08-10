<?php declare(strict_types=1);


namespace Plandiet\App\Tools\Sandbox\Actions;

use App\Models\User;
use Illuminate\Support\Arr;
use Plandiet\App\Meal\Services\MealRecommendationService;
use Plandiet\App\Tools\RuleEditor\Models\NutritionRule;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;

final class RunSandbox
{
    public function run(array $data): RuleSandboxTest
    {
        $client = User::findOrFail($data['client_id']);

        $profile = $client->clientHealthProfile;
        abort_if(! $profile, 422, 'Client has no health profile.');

        $rules = NutritionRule::where('client_id', $client->id)
//            ->where('is_active', true) since we are testing rules with sandbox before activating rules, we want to test all rules
            ->get();


        if (Arr::has(array: $data, keys: 'include_draft_rules')) {
            foreach ($data['include_draft_rules'] as $draft) {
                $rules->push(new NutritionRule($draft));
            }
        }

        $results = app(MealRecommendationService::class)->generatePlan($profile, $rules);

        return app(RecordSandboxResults::class)->record(client: $client,  profile: $profile, rules: $rules->toArray(), results: $results);
    }
}
