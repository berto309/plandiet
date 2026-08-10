import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::index
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:18
 * @route '/admin/clients'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::index
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:18
 * @route '/admin/clients'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::index
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:18
 * @route '/admin/clients'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::index
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:18
 * @route '/admin/clients'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::show
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:27
 * @route '/admin/clients/{client}'
 */
export const show = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/clients/{client}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::show
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:27
 * @route '/admin/clients/{client}'
 */
show.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { client: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: typeof args.client === 'object'
                ? args.client.id
                : args.client,
                }

    return show.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::show
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:27
 * @route '/admin/clients/{client}'
 */
show.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::show
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:27
 * @route '/admin/clients/{client}'
 */
show.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::update
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
export const update = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/clients/{client}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::update
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
update.url = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: args.client,
                }

    return update.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::update
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
update.put = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::update
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
update.patch = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::destroy
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
export const destroy = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/clients/{client}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::destroy
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
destroy.url = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: args.client,
                }

    return destroy.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientsOverviewController::destroy
 * @see app/Http/Controllers/Analytics/Client/ClientsOverviewController.php:0
 * @route '/admin/clients/{client}'
 */
destroy.delete = (args: { client: string | number } | [client: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const clients = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default clients