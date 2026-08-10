import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
const ClientDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ClientDashboardController.url(options),
    method: 'get',
})

ClientDashboardController.definition = {
    methods: ["get","head"],
    url: '/client',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
ClientDashboardController.url = (options?: RouteQueryOptions) => {
    return ClientDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
ClientDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ClientDashboardController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
ClientDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ClientDashboardController.url(options),
    method: 'head',
})
export default ClientDashboardController