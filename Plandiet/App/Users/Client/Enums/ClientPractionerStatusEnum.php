<?php declare(strict_types=1);


namespace Plandiet\App\Users\Client\Enums;
use Plandiet\Infrastructure\Traits\InteractsWithEnums;

enum ClientPractionerStatusEnum: string
{
    use InteractsWithEnums;
  case ACTIVE = 'active';
  CASE DISCHARGED = 'discharged';
  CASE TRANSFERRED = 'transferred';
}
