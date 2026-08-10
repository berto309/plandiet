import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

today.definition = {
    methods: ["get","head"],
    url: '/client/meal-plans/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
})
const mealPlans = {
    today: Object.assign(today, today),
}

export default mealPlans