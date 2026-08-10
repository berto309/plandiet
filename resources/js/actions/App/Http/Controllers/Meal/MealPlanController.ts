import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
const MealPlanController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MealPlanController.url(options),
    method: 'post',
})

MealPlanController.definition = {
    methods: ["post"],
    url: '/client/meal-plans/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
MealPlanController.url = (options?: RouteQueryOptions) => {
    return MealPlanController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
MealPlanController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MealPlanController.url(options),
    method: 'post',
})
export default MealPlanController