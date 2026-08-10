<?php declare(strict_types=1);


namespace Plandiet\App\Tools\Sandbox\Actions;

use App\Models\User;
use Illuminate\Support\Collection;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;

final class RecordSandboxResults
{
    public function record(User $client, ClientHealthProfile $profile, array $rules, array $results): RuleSandboxTest
    {

        return RuleSandboxTest::create([
            'practitioner_id'  => auth()->id(),
            'client_id'        => $client->id,
            'test_profile'     => $profile->toArray(),
            'rule_set_snapshot'=> $rules,
            'candidate_meals'  => $results['meals'],
            'results'          => $results,
            'pass_count'       => count($results['meals']),
            'fail_count'       => 0,
        ]);
    }
}
