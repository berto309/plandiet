<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\Enums;
enum  ConflictLevelEnum: string
{
    case HARD = 'hard';
    case SOFT = 'soft';
    case NEAR = 'near';
}
