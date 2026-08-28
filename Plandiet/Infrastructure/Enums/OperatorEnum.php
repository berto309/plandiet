<?php declare(strict_types=1);


namespace Plandiet\Infrastructure\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum OperatorEnum: string
{
    use InteractsWithEnums;

    case LESS_THAN_OR_EQUAL_TO = 'lte';
    case GREATER_THAN_OR_EQUAL_TO = 'gte';
    case EQUAL_TO = 'eq';
    case EXCLUDE = 'exclude';
    case PRIORITIZE = 'prioritize';
    case REQUIRE = 'require';




    public function operatorTranslation():string
    {
        return match ($this) {
            self::LESS_THAN_OR_EQUAL_TO => '<=',
            self::GREATER_THAN_OR_EQUAL_TO => '>=',
            self::EQUAL_TO => 'Equal to',
            self::EXCLUDE, self::PRIORITIZE, self::REQUIRE => ' → ' . ucfirst($this->value),
        };
    }
}
