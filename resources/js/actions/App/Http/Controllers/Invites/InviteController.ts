import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Invites\InviteController::index
 * @see app/Http/Controllers/Invites/InviteController.php:20
 * @route '/practitioner/invites'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/invites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::index
 * @see app/Http/Controllers/Invites/InviteController.php:20
 * @route '/practitioner/invites'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::index
 * @see app/Http/Controllers/Invites/InviteController.php:20
 * @route '/practitioner/invites'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Invites\InviteController::index
 * @see app/Http/Controllers/Invites/InviteController.php:20
 * @route '/practitioner/invites'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Invites\InviteController::create
 * @see app/Http/Controllers/Invites/InviteController.php:29
 * @route '/practitioner/invites/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/practitioner/invites/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::create
 * @see app/Http/Controllers/Invites/InviteController.php:29
 * @route '/practitioner/invites/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::create
 * @see app/Http/Controllers/Invites/InviteController.php:29
 * @route '/practitioner/invites/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Invites\InviteController::create
 * @see app/Http/Controllers/Invites/InviteController.php:29
 * @route '/practitioner/invites/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Invites\InviteController::store
 * @see app/Http/Controllers/Invites/InviteController.php:41
 * @route '/practitioner/invites'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/practitioner/invites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::store
 * @see app/Http/Controllers/Invites/InviteController.php:41
 * @route '/practitioner/invites'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::store
 * @see app/Http/Controllers/Invites/InviteController.php:41
 * @route '/practitioner/invites'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Invites\InviteController::show
 * @see app/Http/Controllers/Invites/InviteController.php:34
 * @route '/practitioner/invites/{invite}'
 */
export const show = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/practitioner/invites/{invite}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::show
 * @see app/Http/Controllers/Invites/InviteController.php:34
 * @route '/practitioner/invites/{invite}'
 */
show.url = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invite: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invite: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invite: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invite: typeof args.invite === 'object'
                ? args.invite.id
                : args.invite,
                }

    return show.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::show
 * @see app/Http/Controllers/Invites/InviteController.php:34
 * @route '/practitioner/invites/{invite}'
 */
show.get = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Invites\InviteController::show
 * @see app/Http/Controllers/Invites/InviteController.php:34
 * @route '/practitioner/invites/{invite}'
 */
show.head = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Invites\InviteController::resend
 * @see app/Http/Controllers/Invites/InviteController.php:68
 * @route '/practitioner/invites/{invite}/resend'
 */
export const resend = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: resend.url(args, options),
    method: 'put',
})

resend.definition = {
    methods: ["put"],
    url: '/practitioner/invites/{invite}/resend',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::resend
 * @see app/Http/Controllers/Invites/InviteController.php:68
 * @route '/practitioner/invites/{invite}/resend'
 */
resend.url = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invite: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invite: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invite: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invite: typeof args.invite === 'object'
                ? args.invite.id
                : args.invite,
                }

    return resend.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::resend
 * @see app/Http/Controllers/Invites/InviteController.php:68
 * @route '/practitioner/invites/{invite}/resend'
 */
resend.put = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: resend.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Invites\InviteController::revoke
 * @see app/Http/Controllers/Invites/InviteController.php:87
 * @route '/practitioner/invites/{invite}/revoke'
 */
export const revoke = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})

revoke.definition = {
    methods: ["delete"],
    url: '/practitioner/invites/{invite}/revoke',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Invites\InviteController::revoke
 * @see app/Http/Controllers/Invites/InviteController.php:87
 * @route '/practitioner/invites/{invite}/revoke'
 */
revoke.url = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invite: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invite: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invite: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invite: typeof args.invite === 'object'
                ? args.invite.id
                : args.invite,
                }

    return revoke.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\InviteController::revoke
 * @see app/Http/Controllers/Invites/InviteController.php:87
 * @route '/practitioner/invites/{invite}/revoke'
 */
revoke.delete = (args: { invite: number | { id: number } } | [invite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})
const InviteController = { index, create, store, show, resend, revoke }

export default InviteController