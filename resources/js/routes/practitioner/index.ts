import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import clients3a2bdc from './clients'
import profile937a89 from './profile'
/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clients
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
export const clients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clients.url(options),
    method: 'get',
})

clients.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clients
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
clients.url = (options?: RouteQueryOptions) => {
    return clients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clients
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
clients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clients.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clients
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
clients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clients.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::profile
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/practitioner/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::profile
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::profile
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::profile
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})
const practitioner = {
    dashboard: Object.assign(dashboard, dashboard),
clients: Object.assign(clients, clients3a2bdc),
profile: Object.assign(profile, profile937a89),
}

export default practitioner