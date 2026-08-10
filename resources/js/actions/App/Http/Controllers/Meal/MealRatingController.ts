import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
const MealRatingController = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: MealRatingController.url(args, options),
    method: 'put',
})

MealRatingController.definition = {
    methods: ["put"],
    url: '/client/meal-plan-item/{meal}/rate',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
MealRatingController.url = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { meal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    meal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        meal: args.meal,
                }

    return MealRatingController.definition.url
            .replace('{meal}', parsedArgs.meal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
MealRatingController.put = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: MealRatingController.url(args, options),
    method: 'put',
})
export default MealRatingController