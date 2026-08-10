<?php declare(strict_types=1);


namespace Plandiet\App\Tools\Sandbox\Actions;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Plandiet\App\Tools\Sandbox\Model\RuleSandboxTest;
use Plandiet\App\Users\Client\Models\ClientHealthProfile;

final class GetSandboxTestResults
{
    public function get(): ?LengthAwarePaginator
    {

        return RuleSandboxTest::where('practitioner_id', auth()->id())
            ->with('client:id,name,email')
            ->paginate();
    }
}
