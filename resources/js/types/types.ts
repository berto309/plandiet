import {ComponentType} from "react";

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




