import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
const AdminDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(options),
    method: 'get',
})

AdminDashboardController.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
AdminDashboardController.url = (options?: RouteQueryOptions) => {
    return AdminDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
AdminDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
AdminDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminDashboardController.url(options),
    method: 'head',
})
export default AdminDashboardController