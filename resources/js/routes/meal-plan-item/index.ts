import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
export const swap = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: swap.url(args, options),
    method: 'put',
})

swap.definition = {
    methods: ["put"],
    url: '/client/meal-plan-item/{meal}/swap',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
swap.url = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return swap.definition.url
            .replace('{meal}', parsedArgs.meal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealSwapController::__invoke
 * @see app/Http/Controllers/Meal/MealSwapController.php:16
 * @route '/client/meal-plan-item/{meal}/swap'
 */
swap.put = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: swap.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
export const rate = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rate.url(args, options),
    method: 'put',
})

rate.definition = {
    methods: ["put"],
    url: '/client/meal-plan-item/{meal}/rate',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
rate.url = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rate.definition.url
            .replace('{meal}', parsedArgs.meal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Meal\MealRatingController::__invoke
 * @see app/Http/Controllers/Meal/MealRatingController.php:16
 * @route '/client/meal-plan-item/{meal}/rate'
 */
rate.put = (args: { meal: string | number } | [meal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: rate.url(args, options),
    method: 'put',
})
const mealPlanItem = {
    swap: Object.assign(swap, swap),
rate: Object.assign(rate, rate),
}

export default mealPlanItem