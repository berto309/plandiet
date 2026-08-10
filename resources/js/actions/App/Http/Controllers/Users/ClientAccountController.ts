import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\ClientAccountController::acceptInvite
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
export const acceptInvite = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptInvite.url(options),
    method: 'post',
})

acceptInvite.definition = {
    methods: ["post"],
    url: '/invitation/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\ClientAccountController::acceptInvite
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
acceptInvite.url = (options?: RouteQueryOptions) => {
    return acceptInvite.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientAccountController::acceptInvite
 * @see app/Http/Controllers/Users/ClientAccountController.php:31
 * @route '/invitation/accept'
 */
acceptInvite.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptInvite.url(options),
    method: 'post',
})
const ClientAccountController = { acceptInvite }

export default ClientAccountController