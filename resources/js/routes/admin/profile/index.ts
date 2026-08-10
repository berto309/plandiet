import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\AdminProfileController::update
 * @see app/Http/Controllers/Users/AdminProfileController.php:24
 * @route '/admin/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\AdminProfileController::update
 * @see app/Http/Controllers/Users/AdminProfileController.php:24
 * @route '/admin/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminProfileController::update
 * @see app/Http/Controllers/Users/AdminProfileController.php:24
 * @route '/admin/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\AdminProfileController::changePassword
 * @see app/Http/Controllers/Users/AdminProfileController.php:50
 * @route '/admin/profile/change-password'
 */
export const changePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})

changePassword.definition = {
    methods: ["put"],
    url: '/admin/profile/change-password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\AdminProfileController::changePassword
 * @see app/Http/Controllers/Users/AdminProfileController.php:50
 * @route '/admin/profile/change-password'
 */
changePassword.url = (options?: RouteQueryOptions) => {
    return changePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\AdminProfileController::changePassword
 * @see app/Http/Controllers/Users/AdminProfileController.php:50
 * @route '/admin/profile/change-password'
 */
changePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})
const profile = {
    update: Object.assign(update, update),
changePassword: Object.assign(changePassword, changePassword),
}

export default profile