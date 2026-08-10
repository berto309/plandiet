import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::index
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::index
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::index
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::index
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:19
 * @route '/practitioner/profile'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::edit
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:26
 * @route '/practitioner/profile/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/practitioner/profile/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::edit
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:26
 * @route '/practitioner/profile/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::edit
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:26
 * @route '/practitioner/profile/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::edit
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:26
 * @route '/practitioner/profile/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:33
 * @route '/practitioner/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/practitioner/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:33
 * @route '/practitioner/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:33
 * @route '/practitioner/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::updatePractitionerProfileInfo
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
export const updatePractitionerProfileInfo = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePractitionerProfileInfo.url(options),
    method: 'put',
})

updatePractitionerProfileInfo.definition = {
    methods: ["put"],
    url: '/practitioner/profile/update-practitioner-information',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::updatePractitionerProfileInfo
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
updatePractitionerProfileInfo.url = (options?: RouteQueryOptions) => {
    return updatePractitionerProfileInfo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::updatePractitionerProfileInfo
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
updatePractitionerProfileInfo.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePractitionerProfileInfo.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::changePassword
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:59
 * @route '/practitioner/profile/change-password'
 */
export const changePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})

changePassword.definition = {
    methods: ["put"],
    url: '/practitioner/profile/change-password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::changePassword
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:59
 * @route '/practitioner/profile/change-password'
 */
changePassword.url = (options?: RouteQueryOptions) => {
    return changePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::changePassword
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:59
 * @route '/practitioner/profile/change-password'
 */
changePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: changePassword.url(options),
    method: 'put',
})
const PractitionerProfileController = { index, edit, update, updatePractitionerProfileInfo, changePassword }

export default PractitionerProfileController