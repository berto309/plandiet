import {ComponentType} from "react";
import {
    ConflictLevelEnum,
    NutritionRuleConstraintTypeEnum,
    NutritionRulePriorityEnum,
    OperatorEnum
} from "@/types/enums";

export interface User {
    id: number,
    name: string,
    phone?: string,
    email: string,
    gender: string,
    role: string,
    date_of_birth?: string,
    status: string,
    city: string,
    post_code: string,
    address: string,
    practitioner_profile: PractitionerProfile,
    client_health_profile: ClientHealthProfile,
    nutrition_rules: NutritionRule[],
    practitioner_client: PractitionerClient,
    practitioner_documents: Media[],
    created_at: string
}

export interface MyPractitioner {
    name: string,
    email: string,
    next_review_date?: string,
    verification_status: string,
    website?: string,
    regulator: string,
    professional_title: string
}

export interface PractitionerProfile {
    id: number,
    professional_title?: string,
    credential_type?: string,
    registration_number: string,
    regulator: string,
    country_of_practice?: string,
    practice_name: string,
    bio?: string,
    website?: string,
    verification_status: string,
    verified_at: string,
    verified_by?: User,
    rejection_reason?: string,
    suspension_reason?: string,
    registration_expiry?: string,
    insurance_expiry?: string,
    created_at: string
}

export interface ClientHealthProfile {
    id: string,
    conditions: [],
    allergies: [],
    intolerances: [],
    primary_goal: string,
    height_cm?: number,
    weight_kg?: number,
    activity_level?: number,
    target_calories?: number,
    target_protein_g?: number,
    target_carbs_g?: number,
    target_fat_g?: number,
    target_fibre_g?: number,
    target_sodium_mg?: number,
    cuisine_preferences: [],
    dietary_preferences: [],
    meals_per_day?: number,
    max_cooking_minutes?: number

}

export interface RuleTemplate {
    id: number,
    name: string,
    slug: string,
    condition_tag: string,
    nutrient: string,
    operator: string,
    operator_translation: string,
    default_value?: number,
    unit?: number,
    constraint_type: string,
    category: string,
    priority: string,
    clinical_rationale?: string,
    evidence_source?: string,
    is_active: boolean,
}

export interface Invite {
    id: number,
    invited_name: string;
    email: string;
    expires_at: string;
    next_review_date: string,
    status: string;
    created_at: string;
}

export interface NutritionRule {
    id: number,
    name: string,
    nutrient: string,
    operator: string,
    operator_translation: string,
    value?: number,
    unit?: number,
    constraint_type: string,
    priority: string,
    practitioner_note?: string,
    is_active: boolean,
    version?: number,
    client?: User,
    practitioner?: User
}


export type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

export type AppEnums = any

interface NavItem {
    name: string;
    icon: IconType;
    active?: boolean;
    href: string;
}

export interface NavSection {
    label: string;
    items: NavItem[];
}

export type InviteStatus = "pending" | "accepted";

export interface Invite {
    id: number;
    invited_name: string;
    status: string;
    email: string;
    expires_at: string;
    created_at: string;
}

export interface StatusPillProps {
    status: InviteStatus;
    note: string | null;
}

export interface Crumb {
    label: string;
    icon?: IconType;
    href?: string;
}

export interface ClientComplianceDashboardTargets {
    calories: number,
    protein_g: number,
    carbs_g: number,
    fat_g: number,
    sodium_mg: number,
    fibre_g: number
}

export interface AccountMenuProps {
    align?: "left" | "right";
    direction?: "up" | "down";
    variant?: "full" | "compact";
    triggerClassName?: string;
}

export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
};

export type PaginationLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type PaginatedData<T> = {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
};



// Admin Dashboard Analytics
type AdminCardStats = {
    total_clients: number,
    total_unverified_practitioners: number,
    total_verified_practitioners: number,
    meal_plans_generated_today: number
}

export type AdminDashboardAnalytics = {
    stats: AdminCardStats,
    recent_practitioners_under_review: [],
    recent_clients: []
}

// Practitioner Dashboard Analytics
type PractitionerCardStats = {
    total_clients: number,
    total_nutrition_rules_generated: number,
    total_meal_plans_across_clients: number,
    total_client_reviews_this_week: number,
    meal_plans_generated_by_clients_today: number
}

export type PractitionerDashboardAnalytics = {
    stats: PractitionerCardStats,
    client_reviews_this_week: [],
    recent_clients: []
}

// Client Dashboard Analytics
export type ClientDashboardAnalytics = {
    practitioner: MyPractitioner,
    meals: MealPlanItem[],
    streak: number,
    compliance: ClientComplianceDashboardTargets
}

export type PractitionerClient = {
    id: number,
    name: string,
    email: string,
    client: User,
    status: string,
    clinical_notes?: string,
    website: string | null,
    next_review_date: string,
}

// Verification
export type VerificationQueue = User[]


export interface SandBoxTest  {
    id: number,
    practitioner: User,
    client: User,
    test_profile?: TestProfile,
    rule_set_snapshot: [],
    candidate_meals: CandidateMeal[],
    results: Result,
    pass_count: number,
    fail_count: number,
    created_at: string
}

// Meals
export interface CandidateMeal {
    name: string,
    fat_g: number,
    carbs_g: number,
    fibre_g: number,
    calories: number,
    meal_type: string,
    protein_g: number,
    sat_fat_g: number,
    sodium_mg: number,
    meal_order: number,
    why_chosen: string,
    ingredients: string,
    prep_minutes: number,
    recipe_steps: string
}


export type MealResult = CandidateMeal


export interface TestProfile {
    id: number,
    allergies: [],
    height_cm: string,
    weight_kg: string,
    conditions?: [],
    primary_goal: string,
    target_fat_g: number,
    meals_per_day: number,
    activity_level: string,
    target_carbs_g: number,
    target_fibre_g: number,
    target_calories: number,
    target_protein_g: number,
    target_sodium_mg: number,
    cuisine_preferences: [],
    dietary_preferences: [],
    max_cooking_minutes: string
}

export interface Result {
    meals: MealResult[],
    near_misses: [],
    totals: Record<string, number>

}

export interface Media {
    id: number,
    file_name: string,
    mime_type: string,
    model_type: string,
    size: number,
    collection_name: string,
    original_url: string,
    created_at: string
}

export interface MealPlan {
    id: number,
    total_calories: number,
    total_protein_g: number,
    total_carbs_g: number,
    total_fat_g: number,
    total_fibre_g: number,
    total_sodium_mg: number,
    status: string,
    meal_plan_items: MealPlanItem[]
    created_at: string,
}

export interface MealPlanItem {
    id: number,
    name: string,
    meal_type: string,
    rating: number,
    meal_order: number,
    description: string | null,
    ingredients: string | null,
    recipe_steps: string,
    prep_minutes: number | null,
    calories: number,
    protein_g: number,
    carbs_g: number,
    fat_g: number,
    sat_fat_g: number,
    fibre_g: number,
    sodium_mg: number,
    why_chosen: string | null,
    rules_matched: string | null,
    candidates_rejected: [],
    was_swapped: boolean,
}


export interface PractitionerComplianceThisWeek {
    id: number,
    name: string,
    email: string,
    conditions: [],
    meal_plans_count: number,
    meal_plans_percentage: number
}

export interface NutritionRuleHistory{
    id: number
    nutrition_rule: NutritionRule,
    user: User,
    action: HistoryAction;
    previous_state: unknown;
    new_state?: unknown;
    change_reason: string | null;
    created_at: string
}

export interface NutritionRuleHistoryEntry {
    id: number;
    nutrition_rule_id: number;
    rule_name?: string; // denormalized, e.g. from an eager-loaded relation
    changed_by: number;
    changed_by_name?: string;
    changed_by_initials?: string;
    action: HistoryAction;
    previous_state: unknown; // JSON string | object | null
    new_state: unknown; // JSON string | object
    change_reason: string | null;
    created_at: string; // ISO timestamp
}


/**
 * previous_state / new_state come from a Laravel `json` column with no cast,
 * so the API can return them as an already-serialized JSON string rather than
 * a parsed object. parseState normalizes either shape to a plain object.
 */
export function parseState(state: unknown): Record<string, unknown> | null {
    if (state === null || state === undefined) return null;
    if (typeof state === "string") {
        try {
            const parsed = JSON.parse(state);
            return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : null;
        } catch {
            return null;
        }
    }
    if (typeof state === "object") return state as Record<string, unknown>;
    return null;
}

/**
 * Individual field values can themselves be JSON strings (e.g. `applies_when`
 * is sometimes double-encoded inside new_state). normalizeValue parses those
 * so the same field compares/display consistently regardless of which side
 * of the diff it came from.
 */
export function normalizeValue(value: unknown): unknown {
    if (typeof value === "string") {
        const t = value.trim();
        if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
            try {
                return JSON.parse(t);
            } catch {
                return value;
            }
        }
    }
    return value;
}

export function stringifyValue(value: unknown): string {
    const v = normalizeValue(value);
    if (v === null || v === undefined || v === "") return "—";
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (Array.isArray(v)) return v.length ? v.map(stringifyValue).join(", ") : "—";
    if (typeof v === "object") {
        const entries = Object.entries(v as Record<string, unknown>);
        return entries.length ? entries.map(([k, val]) => `${k}: ${stringifyValue(val)}`).join(", ") : "—";
    }
    return String(v);
}

export type DiffStatus = "added" | "removed" | "changed" | "unchanged";

export interface DiffRow {
    key: string;
    label: string;
    prev: string;
    next: string;
    status: DiffStatus;
}

function humanizeKey(key: string): string {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Columns that exist on the model but aren't meaningful "field changes" —
 * previous_state is a full model dump (id, timestamps, version, foreign
 * keys to templates) while new_state is only the fillable attributes that
 * were actually written. Without this exclusion every one of these would
 * show up as "removed" on every single update.
 */
const META_ARRAY = ["id",  "practitioner_id", "client_id", "created_at", "updated_at", "deleted_at", "version", "rule_template_id"];
const META_KEYS = new Set(META_ARRAY);

/**
 * Compares previous_state and new_state (raw values straight from the
 * nutrition_rule_history columns — either JSON strings or already-parsed
 * objects) and returns one row per business-state field, classified as
 * added / removed / changed / unchanged.
 *
 * - previous is null on the 'created' action -> every field is "added".
 * - Keys only present in previous_state's full dump (see META_KEYS) are
 *   treated as record metadata, not diffed.
 */
export function diffStates(previousRaw: unknown, nextRaw: unknown): DiffRow[] {
    const previous = parseState(previousRaw);
    const next = parseState(nextRaw) ?? {};

    const keys = new Set<string>([
        ...Object.keys(next),
        ...(previous ? Object.keys(previous).filter((k) => !META_KEYS.has(k)) : []),
    ]);



    const rows: DiffRow[] = [];

    keys.forEach((key) => {
        const prevRaw = previous ? previous[key] : undefined;
        const nextRawVal = next[key];
        const prevValue = normalizeValue(prevRaw);
        const nextValue = normalizeValue(nextRawVal);

        let status: DiffStatus;
        if (!previous || prevRaw === undefined) status = "added";
        else if (nextRawVal === undefined) status = "removed";
        else if (JSON.stringify(prevValue) !== JSON.stringify(nextValue)) status = "changed";
        else status = "unchanged";

        rows.push({
            key,
            label: humanizeKey(key),
            prev: stringifyValue(prevRaw),
            next: stringifyValue(nextRawVal),
            status,
        });
    });



    return rows.sort((a, b) => a.label.localeCompare(b.label));
}



export type HistoryAction = "created" | "updated" | "activated" | "deactivated" | "deleted";



/* ============================================================
   Display fallbacks — used whenever the API didn't eager-load
   the denormalized fields above.
   ============================================================ */

export function resolveRuleName(entry: NutritionRuleHistory): string {

    if (entry.nutrition_rule.name) return entry.nutrition_rule.name;
    const state = (parseState(entry.new_state) ?? parseState(entry.previous_state)) as Record<string, unknown> | null;
    const name = state?.name;
    return typeof name === "string" && name ? name : `Rule #${entry.nutrition_rule.id}`;
}

export function resolveChangedByLabel(entry: NutritionRuleHistory): string {
    return entry.user.name ?? `User #${entry.user.id}`;
}

export function resolveInitials(entry: NutritionRuleHistory): string {

        return entry.user.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()

}

/**
 * Metadata that only lives inside previous_state's full model dump
 * (id, version, rule_template_id, timestamps) — useful for the detail
 * page's sidebar, not part of the field-change diff itself.
 */
export function resolveRecordMeta(entry: NutritionRuleHistory): { version?: unknown; ruleTemplateId?: unknown } {
    const state = parseState(entry.previous_state) as Record<string, unknown> | null;
    return { version: state?.version, ruleTemplateId: state?.rule_template_id };
}



export const ACTION_META: Record<HistoryAction, { label: string; badgeClass: string; dotClass: string }> = {
    created: { label: "Created", badgeClass: "bg-sage-pale text-sage", dotClass: "bg-sage" },
    updated: { label: "Updated", badgeClass: "bg-info/15 text-info", dotClass: "bg-info" },
    activated: { label: "Activated", badgeClass: "bg-sage-mist/40 text-sage", dotClass: "bg-sage-light" },
    deactivated: { label: "Deactivated", badgeClass: "bg-warn/15 text-warn", dotClass: "bg-warn" },
    deleted: { label: "Deleted", badgeClass: "bg-danger/15 text-danger", dotClass: "bg-danger" },
};

type Operator = OperatorEnum.LESS_THAN_OR_EQUAL_TO | OperatorEnum.GREATER_THAN_OR_EQUAL_TO | OperatorEnum.EQUAL_TO | OperatorEnum.EXCLUDE | OperatorEnum.REQUIRE | OperatorEnum.PRIORITIZE;
type ConstraintType = NutritionRuleConstraintTypeEnum.HARD | NutritionRuleConstraintTypeEnum.SOFT;
type Priority = NutritionRulePriorityEnum.CRITICAL | NutritionRulePriorityEnum.HIGH | NutritionRulePriorityEnum.MEDIUM | NutritionRulePriorityEnum.LOW;
type ConflictLevel = ConflictLevelEnum.HARD | ConflictLevelEnum.SOFT | ConflictLevelEnum.NEAR;

export interface ConflictEntry {
    id: string;
    level: ConflictLevel;
    type: string;
    message: string;
    incomingRule: { nutrient_key: string; operator: Operator; value?: number; priority: Priority };
    conflictingRule: { id: number; nutrient_key: string; operator: Operator; value?: number; priority: Priority; label?: string };
    detail?: { lower_bound?: number; upper_bound?: number; window?: number; typical_range_pct?: number };
}

export interface ConflictReport {
    has_hard_conflicts: boolean;
    has_soft_conflicts: boolean;
    summary: string;
    hard: ConflictEntry[];
    soft: ConflictEntry[];
    near: ConflictEntry[];
    existing: NutritionRule[]
}



