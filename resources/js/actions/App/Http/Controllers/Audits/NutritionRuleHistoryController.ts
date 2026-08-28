import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::index
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:24
 * @route '/admin/nutrition-rules-history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/nutrition-rules-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::index
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:24
 * @route '/admin/nutrition-rules-history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::index
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:24
 * @route '/admin/nutrition-rules-history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::index
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:24
 * @route '/admin/nutrition-rules-history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::show
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:33
 * @route '/admin/nutrition-rules-history/{nutritionRuleHistory}/show'
 */
export const show = (args: { nutritionRuleHistory: number | { id: number } } | [nutritionRuleHistory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/nutrition-rules-history/{nutritionRuleHistory}/show',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::show
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:33
 * @route '/admin/nutrition-rules-history/{nutritionRuleHistory}/show'
 */
show.url = (args: { nutritionRuleHistory: number | { id: number } } | [nutritionRuleHistory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nutritionRuleHistory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { nutritionRuleHistory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    nutritionRuleHistory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nutritionRuleHistory: typeof args.nutritionRuleHistory === 'object'
                ? args.nutritionRuleHistory.id
                : args.nutritionRuleHistory,
                }

    return show.definition.url
            .replace('{nutritionRuleHistory}', parsedArgs.nutritionRuleHistory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::show
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:33
 * @route '/admin/nutrition-rules-history/{nutritionRuleHistory}/show'
 */
show.get = (args: { nutritionRuleHistory: number | { id: number } } | [nutritionRuleHistory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Audits\NutritionRuleHistoryController::show
 * @see app/Http/Controllers/Audits/NutritionRuleHistoryController.php:33
 * @route '/admin/nutrition-rules-history/{nutritionRuleHistory}/show'
 */
show.head = (args: { nutritionRuleHistory: number | { id: number } } | [nutritionRuleHistory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const NutritionRuleHistoryController = { index, show }

export default NutritionRuleHistoryController