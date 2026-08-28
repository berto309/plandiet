import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::index
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:29
 * @route '/practitioner/nutrition-rules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/nutrition-rules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::index
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:29
 * @route '/practitioner/nutrition-rules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::index
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:29
 * @route '/practitioner/nutrition-rules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::index
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:29
 * @route '/practitioner/nutrition-rules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::create
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:39
 * @route '/practitioner/nutrition-rules/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/practitioner/nutrition-rules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::create
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:39
 * @route '/practitioner/nutrition-rules/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::create
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:39
 * @route '/practitioner/nutrition-rules/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::create
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:39
 * @route '/practitioner/nutrition-rules/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::store
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:51
 * @route '/practitioner/nutrition-rules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/practitioner/nutrition-rules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::store
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:51
 * @route '/practitioner/nutrition-rules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::store
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:51
 * @route '/practitioner/nutrition-rules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::show
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:107
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
export const show = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/practitioner/nutrition-rules/{nutrition_rule}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::show
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:107
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
show.url = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nutrition_rule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { nutrition_rule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    nutrition_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nutrition_rule: typeof args.nutrition_rule === 'object'
                ? args.nutrition_rule.id
                : args.nutrition_rule,
                }

    return show.definition.url
            .replace('{nutrition_rule}', parsedArgs.nutrition_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::show
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:107
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
show.get = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::show
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:107
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
show.head = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::update
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:123
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
export const update = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/practitioner/nutrition-rules/{nutrition_rule}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::update
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:123
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
update.url = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nutrition_rule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { nutrition_rule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    nutrition_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nutrition_rule: typeof args.nutrition_rule === 'object'
                ? args.nutrition_rule.id
                : args.nutrition_rule,
                }

    return update.definition.url
            .replace('{nutrition_rule}', parsedArgs.nutrition_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::update
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:123
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
update.put = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::update
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:123
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
update.patch = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:203
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
export const destroy = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/practitioner/nutrition-rules/{nutrition_rule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:203
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
destroy.url = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nutrition_rule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { nutrition_rule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    nutrition_rule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nutrition_rule: typeof args.nutrition_rule === 'object'
                ? args.nutrition_rule.id
                : args.nutrition_rule,
                }

    return destroy.definition.url
            .replace('{nutrition_rule}', parsedArgs.nutrition_rule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\NutritionRuleController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/NutritionRuleController.php:203
 * @route '/practitioner/nutrition-rules/{nutrition_rule}'
 */
destroy.delete = (args: { nutrition_rule: number | { id: number } } | [nutrition_rule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const nutritionRules = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default nutritionRules