import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\ClientProfileController::edit
 * @see app/Http/Controllers/Users/ClientProfileController.php:25
 * @route '/client/profile/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/client/profile/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\ClientProfileController::edit
 * @see app/Http/Controllers/Users/ClientProfileController.php:25
 * @route '/client/profile/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientProfileController::edit
 * @see app/Http/Controllers/Users/ClientProfileController.php:25
 * @route '/client/profile/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\ClientProfileController::edit
 * @see app/Http/Controllers/Users/ClientProfileController.php:25
 * @route '/client/profile/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\ClientProfileController::update
 * @see app/Http/Controllers/Users/ClientProfileController.php:32
 * @route '/client/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/client/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\ClientProfileController::update
 * @see app/Http/Controllers/Users/ClientProfileController.php:32
 * @route '/client/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientProfileController::update
 * @see app/Http/Controllers/Users/ClientProfileController.php:32
 * @route '/client/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\ClientProfileController::changePassword
 * @see app/Http/Controllers/Users/ClientProfileController.php:58
 * @route '/client/profile/change-password'
 */
export const changePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})

changePassword.definition = {
    methods: ["put"],
    url: '/client/profile/change-password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\ClientProfileController::changePassword
 * @see app/Http/Controllers/Users/ClientProfileController.php:58
 * @route '/client/profile/change-password'
 */
changePassword.url = (options?: RouteQueryOptions) => {
    return changePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientProfileController::changePassword
 * @see app/Http/Controllers/Users/ClientProfileController.php:58
 * @route '/client/profile/change-password'
 */
changePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
changePassword: Object.assign(changePassword, changePassword),
}

export default profile