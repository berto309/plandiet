import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::createHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
export const createHealthProfile = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createHealthProfile.url(args, options),
    method: 'get',
})

createHealthProfile.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients/{client}/create-health-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::createHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
createHealthProfile.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { client: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: typeof args.client === 'object'
                ? args.client.id
                : args.client,
                }

    return createHealthProfile.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::createHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
createHealthProfile.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createHealthProfile.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::createHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
createHealthProfile.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createHealthProfile.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::storeHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
export const storeHealthProfile = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHealthProfile.url(args, options),
    method: 'post',
})

storeHealthProfile.definition = {
    methods: ["post"],
    url: '/practitioner/clients/{client}/create-health-profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::storeHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
storeHealthProfile.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { client: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: typeof args.client === 'object'
                ? args.client.id
                : args.client,
                }

    return storeHealthProfile.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::storeHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
storeHealthProfile.post = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeHealthProfile.url(args, options),
    method: 'post',
})
const clients = {
    createHealthProfile: Object.assign(createHealthProfile, createHealthProfile),
storeHealthProfile: Object.assign(storeHealthProfile, storeHealthProfile),
}

export default clients