<?php

declare(strict_types=1);


namespace Plandiet\Infrastructure\Traits;

trait InteractsWithEnums
{
    /**
     * Get the enum value from the name eg. case INVOICE = 'invoice'; will return  'invoice'
     *
     * @param string $name
     * @return self
     */
    public static function fromName(string $name): self | null
    {
        $reflection = new \ReflectionEnum(static::class);

        return $reflection->hasCase($name) ? $reflection->getCase($name)->getValue() : null;
    }

    /**
     * Gets the name of an enum case and capitlizes only the first letter
     *
     * @param int $value
     * @return string
     */
    public static function toString(string $value): string
    {

        return ucfirst(str_replace('_', ' ', strtolower(self::tryFrom($value)->name)));
    }

    /**
     * Get the enum names as an array
     *
     * @return array
     */
    public static function toNames(): array
    {
        return array_column(self::cases(), 'name');
    }

    /**
     * Get the enum values as an array
     *
     * @return array
     */
    public static function toValues(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get the enum as an array. eg. ['invoice' => 'INVOICE' ]
     *
     * @return array
     */
    public static function toArray(): array
    {

        return collect(static::cases())
            ->mapWithKeys(fn(self $el) => [
                $el->value => str_replace('_', ' ', ucfirst(strtolower($el->name))),
            ])
            ->toArray();
    }
}
