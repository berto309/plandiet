import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
const TodayMealPlanController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TodayMealPlanController.url(options),
    method: 'get',
})

TodayMealPlanController.definition = {
    methods: ["get","head"],
    url: '/client/meal-plans/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
TodayMealPlanController.url = (options?: RouteQueryOptions) => {
    return TodayMealPlanController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
TodayMealPlanController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TodayMealPlanController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Meal\TodayMealPlanController::__invoke
 * @see app/Http/Controllers/Meal/TodayMealPlanController.php:14
 * @route '/client/meal-plans/today'
 */
TodayMealPlanController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TodayMealPlanController.url(options),
    method: 'head',
})
export default TodayMealPlanController