import { PageProps as InertiaPageProps } from "@inertiajs/core";
import {
    AdminDashboardAnalytics,
    AppEnums,
    ClientComplianceDashboardTargets,
    ClientDashboardAnalytics,
    ClientHealthProfile,
    Invite,
    MealPlanItem,
    NutritionRule,
    PaginatedData,
    PractitionerClient,
    PractitionerComplianceThisWeek,
    PractitionerDashboardAnalytics,
    PractitionerProfile,
    RuleTemplate,
    SandBoxTest,
    User
} from "@/types/types";
import Meal from "@/actions/App/Http/Controllers/Meal";

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps {
        auth: {
            user:User,
        },
        app: {
          name: string;
          url: string,
        },
        // toast?: {
        //     type: "success" | "error" | "info" | "warning";
        //     message: string;
        // },
        analytics: AdminDashboardAnalytics,
        client_dashboard_analytics: ClientDashboardAnalytics,
        practitioner_analytics: PractitionerDashboardAnalytics,
        practitioner: User,
        practitioner_clients: PaginatedData<PractitionerClient>,
        practitioners: PaginatedData<User>,
        client: User,
        clients: PaginatedData<User>,
        regulators: [],
        practitionerClientsList: PractitionerClient[],
        practitionerCompliance: PaginatedData<PractitionerComplianceThisWeek>,
        invites: PaginatedData<Invite>,
        verificationQueue: PaginatedData<User>,
        ruleTemplate: RuleTemplate,
        ruleTemplates: PaginatedData<RuleTemplate>,
        ruleTemplateList: RuleTemplate[],
        nutritionRule: NutritionRule,
        nutritionRules: PaginatedData<NutritionRule>,
        clientNutritionRulesList: NutritionRule[],
        sandboxTest?: SandBoxTest,
        sandBoxResults: PaginatedData<SandBoxTest>,
        ruleCategories: AppEnums,
        rulePriorities: AppEnums,
        ruleConstraintTypes: AppEnums,
        ruleOperators: AppEnums,
        countries: AppEnums,
        ruleUnits: AppEnums,
        verificationStatuses: AppEnums,
        genders: AppEnums,
        proofOfIdentitiesList: AppEnums,
        profTitles: [],
        token: string,
        invite: Invite,
        practitionerId: string | number,
        inviteId: string | number,
        email: string,
        status?: string,
        intolerancesList: AppEnums,
        dietaryPreferencesList: AppEnums,
        dietPrimaryGoalsList: AppEnums,
        cuisinePreferencesList: AppEnums,
        allergiesList: AppEnums,
        conditionsList: AppEnums,
        mealHistory: MealPlanItem[],
        clientComplianceTargets: ClientComplianceDashboardTargets
        clientStreak: number,
    }
}

declare module "@inertiajs/react" {
    export interface InertiaConfig {
        flashDataType: {
            flash?: {
                type: 'success' | 'danger' | 'error' ;
                message: string,
                data: any,
            }
        }
    }
}
