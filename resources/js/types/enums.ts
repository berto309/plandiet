export enum UserRoleEnum {
    ADMIN = 'admin',
    CLIENT = 'client',
    PRACTITIONER = 'practitioner',
}


export function isAdmin(role: string): boolean
{
    return role === UserRoleEnum.ADMIN
}

export function isClient(role: string): boolean
{
    return role === UserRoleEnum.CLIENT
}

export function isPractitioner(role: string): boolean
{
    return role === UserRoleEnum.PRACTITIONER
}

export enum VerificationStatusEnum {
    UNDER_REVIEW = "under review",
    VERIFIED = "verified",
    REJECTED = "rejected",
    SUSPENDED = "suspended",
}

export function isVerified(status: string): boolean
{
    return status === VerificationStatusEnum.VERIFIED
}

export function isSuspended(status: string): boolean
{
    return status === VerificationStatusEnum.SUSPENDED
}

export function isRejected(status: string): boolean
{
    return status === VerificationStatusEnum.REJECTED
}

export function isUnderReview(status: string): boolean
{
    return status === VerificationStatusEnum.UNDER_REVIEW
}


export enum NutritionRulePriorityEnum {
     CRITICAL = 'critical',
     HIGH = 'high',
     MEDIUM = 'medium',
     LOW = 'low'
}

export function isCritical(status: string): boolean
{
    return status === NutritionRulePriorityEnum.CRITICAL
}

export function isHigh(status: string): boolean
{
    return status === NutritionRulePriorityEnum.HIGH
}

export function isMedium(status: string): boolean
{
    return status === NutritionRulePriorityEnum.MEDIUM
}

export function isLow(status: string): boolean
{
    return status === NutritionRulePriorityEnum.LOW
}

export enum NutritionRuleConstraintTypeEnum {
    HARD = 'hard',
    SOFT = 'soft',
}

export function isHard(status: string): boolean
{
    return status === NutritionRuleConstraintTypeEnum.HARD
}

export function isSoft(status: string): boolean
{
    return status === NutritionRuleConstraintTypeEnum.SOFT
}

export enum RegulatorEnum
{
    HCPC = 'HCPC',
    AFN = 'AfN'
}

export function isHCPC( reg: string): boolean
{
    return reg === RegulatorEnum.HCPC
}


export enum GenderEnum
{
     MALE = "male",
     FEMALE = "female",
     OTHER = "other",
     PREFER_NOT_TO_SAY = "present_not_to_say"
}

export enum UserStatusEnum
{
    PENDING = 'pending',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    INACTIVE = 'inactive'

}

export enum OperatorEnum
{
     LESS_THAN_OR_EQUAL_TO = 'lte',
     GREATER_THAN_OR_EQUAL_TO = 'gte',
     EQUAL_TO = 'eq',
     EXCLUDE = 'exclude',
     PRIORITIZE = 'prioritize',

}

export function getOperatorTranslation(operator: string): string {

    if(operator === OperatorEnum.GREATER_THAN_OR_EQUAL_TO)
    {
        return  '>='

    } else if(operator === OperatorEnum.LESS_THAN_OR_EQUAL_TO)
    {
        return '<='
    } else if(operator === OperatorEnum.EQUAL_TO)
    {
        return '='
    }

    return  ' → ' + operator.charAt(0).toUpperCase() + operator.slice(1);


}

export  enum MealTypeEnum
{
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
    SNACK = 'snack',
    ALL = 'all'
}

export function isBreakfast(mealType: string): boolean
{
    return mealType === MealTypeEnum.BREAKFAST
}

export function isLunch(mealType: string): boolean
{

    return mealType === MealTypeEnum.LUNCH
}

export function isDinner(mealType: string): boolean
{
    return mealType === MealTypeEnum.DINNER
}

export function isSnack(mealType: string): boolean
{
    return mealType === MealTypeEnum.SNACK
}





