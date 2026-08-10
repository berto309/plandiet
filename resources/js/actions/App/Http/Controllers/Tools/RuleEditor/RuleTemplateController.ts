import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::index
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:23
 * @route '/admin/rule-templates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/rule-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::index
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:23
 * @route '/admin/rule-templates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::index
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:23
 * @route '/admin/rule-templates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::index
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:23
 * @route '/admin/rule-templates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::create
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:33
 * @route '/admin/rule-templates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/rule-templates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::create
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:33
 * @route '/admin/rule-templates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::create
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:33
 * @route '/admin/rule-templates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::create
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:33
 * @route '/admin/rule-templates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::store
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:45
 * @route '/admin/rule-templates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/rule-templates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::store
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:45
 * @route '/admin/rule-templates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::store
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:45
 * @route '/admin/rule-templates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::show
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:61
 * @route '/admin/rule-templates/{rule_template}'
 */
export const show = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/rule-templates/{rule_template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::show
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:61
 * @route '/admin/rule-templates/{rule_template}'
 */
show.url = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rule_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { rule_template: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rule_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rule_template: typeof args.rule_template === 'object'
                ? args.rule_template.slug
                : args.rule_template,
                }

    return show.definition.url
            .replace('{rule_template}', parsedArgs.rule_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::show
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:61
 * @route '/admin/rule-templates/{rule_template}'
 */
show.get = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::show
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:61
 * @route '/admin/rule-templates/{rule_template}'
 */
show.head = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::update
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:76
 * @route '/admin/rule-templates/{rule_template}'
 */
export const update = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/rule-templates/{rule_template}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::update
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:76
 * @route '/admin/rule-templates/{rule_template}'
 */
update.url = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rule_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { rule_template: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rule_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rule_template: typeof args.rule_template === 'object'
                ? args.rule_template.slug
                : args.rule_template,
                }

    return update.definition.url
            .replace('{rule_template}', parsedArgs.rule_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::update
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:76
 * @route '/admin/rule-templates/{rule_template}'
 */
update.put = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::update
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:76
 * @route '/admin/rule-templates/{rule_template}'
 */
update.patch = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:90
 * @route '/admin/rule-templates/{rule_template}'
 */
export const destroy = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/rule-templates/{rule_template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:90
 * @route '/admin/rule-templates/{rule_template}'
 */
destroy.url = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rule_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { rule_template: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    rule_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rule_template: typeof args.rule_template === 'object'
                ? args.rule_template.slug
                : args.rule_template,
                }

    return destroy.definition.url
            .replace('{rule_template}', parsedArgs.rule_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\RuleEditor\RuleTemplateController::destroy
 * @see app/Http/Controllers/Tools/RuleEditor/RuleTemplateController.php:90
 * @route '/admin/rule-templates/{rule_template}'
 */
destroy.delete = (args: { rule_template: string | { slug: string } } | [rule_template: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const RuleTemplateController = { index, create, store, show, update, destroy }

export default RuleTemplateController