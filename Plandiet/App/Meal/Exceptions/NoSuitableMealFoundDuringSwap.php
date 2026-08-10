<?php declare(strict_types=1);


namespace Plandiet\App\Meal\Exceptions;
use RuntimeException;

class NoSuitableMealFoundDuringSwap extends RuntimeException
{
    public function __construct(string $reason, ?\Throwable $previous = null)
    {
        parent::__construct(
            "Meal generation failed: {$reason}",
            503,
            $previous
        );
    }
}
