<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;

final class ListRuleTemplates
{
    public function list(): LengthAwarePaginator
    {

        return RuleTemplate::orderByDesc('id')->paginate();

    }
}
