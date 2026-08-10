import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/client/meal-plans/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealPlanController::__invoke
 * @see app/Http/Controllers/Meal/MealPlanController.php:13
 * @route '/client/meal-plans/generate'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})
const mealPlans = {
    generate: Object.assign(generate, generate),
}

export default mealPlans