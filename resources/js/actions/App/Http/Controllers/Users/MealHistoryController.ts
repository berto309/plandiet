import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
const MealHistoryController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: MealHistoryController.url(options),
    method: 'get',
})

MealHistoryController.definition = {
    methods: ["get","head"],
    url: '/client/meal-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
MealHistoryController.url = (options?: RouteQueryOptions) => {
    return MealHistoryController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
MealHistoryController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: MealHistoryController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
MealHistoryController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: MealHistoryController.url(options),
    method: 'head',
})
export default MealHistoryController