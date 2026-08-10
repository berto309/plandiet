<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;

final class EditRuleTemplate
{
    public function update(RuleTemplate $ruleTemplate, array $data): void
    {
        $ruleTemplate->update($data);
    }
}
