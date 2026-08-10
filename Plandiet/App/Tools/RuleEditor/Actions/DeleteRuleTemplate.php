<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;

final class DeleteRuleTemplate
{
    public function delete(RuleTemplate $ruleTemplate): void
    {
        $ruleTemplate->delete();
    }
}
