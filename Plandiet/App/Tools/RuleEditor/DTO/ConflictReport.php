<?php declare(strict_types=1);


namespace Plandiet\App\Tools\RuleEditor\DTO;
use Illuminate\Support\Collection;

/**
 * ConflictReport
 *
 * Value object returned by RuleConflictDetector.
 * Provides typed accessors and serialisation for use in API responses
 * and audit history.
 */
readonly class ConflictReport
{
    public function __construct(
        public array $hard,
        public array $soft,
        public array $near,
        public Collection|null $existing = null
    )
    {
    }

    /** True if any HARD conflicts exist (will block save unless forced). */
    public function hasHardConflicts(): bool
    {
        return !empty($this->hard);
    }

    /** True if any SOFT conflicts exist (warning only). */
    public function hasSoftConflicts(): bool
    {
        return !empty($this->soft);
    }

    /** True if any conflict of any level exists. */
    public function hasAnyConflictsToReport(): bool
    {
        return !empty($this->hard) || !empty($this->soft) || !empty($this->near);
    }

    /** One-line human-readable summary for audit logs. */
    public function summary(): string
    {
        $parts = [];
        if (!empty($this->hard)) $parts[] = count($this->hard) . ' hard conflict(s)';
        if (!empty($this->soft)) $parts[] = count($this->soft) . ' soft conflict(s)';
        if (!empty($this->near)) $parts[] = count($this->near) . ' near conflict(s)';
        return implode(', ', $parts);
    }

    /** Full serialisation for API responses and JSON storage. */
    public function toArray(): array
    {
        return [
            'has_hard_conflicts' => $this->hasHardConflicts(),
            'has_soft_conflicts' => $this->hasSoftConflicts(),
            'summary' => $this->summary(),
            'hard' => $this->hard,
            'soft' => $this->soft,
            'near' => $this->near,
            'existing' => is_null($this->existing) ? [] : $this->existing->toArray()
        ];
    }
}
