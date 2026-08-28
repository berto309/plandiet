import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import profile937a89 from './profile'
import nutritionRulesHistory from './nutrition-rules-history'
/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Admin/AdminDashboardController.php:13
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\AdminProfileController::profile
 * @see app/Http/Controllers/Users/AdminProfileController.php:17
 * @route '/admin/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/admin/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\AdminProfileController::profile
 * @see app/Http/Controllers/Users/AdminProfileController.php:17
 * @route '/admin/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminProfileController::profile
 * @see app/Http/Controllers/Users/AdminProfileController.php:17
 * @route '/admin/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\AdminProfileController::profile
 * @see app/Http/Controllers/Users/AdminProfileController.php:17
 * @route '/admin/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile937a89),
nutritionRulesHistory: Object.assign(nutritionRulesHistory, nutritionRulesHistory),
}

export default admin