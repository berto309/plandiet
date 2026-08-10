import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\ClientAccountController::accept
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
export const accept = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/invitation/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\ClientAccountController::accept
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
accept.url = (options?: RouteQueryOptions) => {
    return accept.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientAccountController::accept
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
accept.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(options),
    method: 'post',
})
const invite = {
    accept: Object.assign(accept, accept),
}

export default invite