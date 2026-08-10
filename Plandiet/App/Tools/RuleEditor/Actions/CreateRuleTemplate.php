<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Actions;

use Plandiet\App\Tools\RuleEditor\DTO\RuleTemplateDTO;
use Plandiet\App\Tools\RuleEditor\Models\RuleTemplate;

final class CreateRuleTemplate
{

    public function create(array $data): RuleTemplate
    {
        return RuleTemplate::create($data);
    }
}
