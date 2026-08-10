import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
const MealSwapController = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: MealSwapController.url(args, options),
    method: 'put',
})

MealSwapController.definition = {
    methods: ["put"],
    url: '/client/meal-plan-item/{meal}/swap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
MealSwapController.url = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return MealSwapController.definition.url
            .replace('{meal}', parsedArgs.meal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
MealSwapController.put = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: MealSwapController.url(args, options),
    method: 'put',
})
export default MealSwapController