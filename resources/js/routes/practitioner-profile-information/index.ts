import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/practitioner/profile/update-practitioner-information',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerProfileController::update
 * @see app/Http/Controllers/Users/PractitionerProfileController.php:81
 * @route '/practitioner/profile/update-practitioner-information'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const practitionerProfileInformation = {
    update: Object.assign(update, update),
}

export default practitionerProfileInformation