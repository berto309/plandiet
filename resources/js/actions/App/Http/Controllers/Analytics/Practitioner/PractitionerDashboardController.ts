import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
const PractitionerDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PractitionerDashboardController.url(options),
    method: 'get',
})

PractitionerDashboardController.definition = {
    methods: ["get","head"],
    url: '/practitioner',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
PractitionerDashboardController.url = (options?: RouteQueryOptions) => {
    return PractitionerDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
PractitionerDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PractitionerDashboardController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Practitioner\PractitionerDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController.php:14
 * @route '/practitioner'
 */
PractitionerDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PractitionerDashboardController.url(options),
    method: 'head',
})
export default PractitionerDashboardController