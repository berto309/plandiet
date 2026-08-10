import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::index
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::index
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::index
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::index
 * @see app/Http/Controllers/Users/PractitionerClientController.php:35
 * @route '/practitioner/clients'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::create
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
export const create = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients/{client}/create-health-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::create
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
create.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::create
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
create.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::create
 * @see app/Http/Controllers/Users/PractitionerClientController.php:44
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
create.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::store
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
export const store = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/practitioner/clients/{client}/create-health-profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::store
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
store.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::store
 * @see app/Http/Controllers/Users/PractitionerClientController.php:63
 * @route '/practitioner/clients/{client}/create-health-profile'
 */
store.post = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::show
 * @see app/Http/Controllers/Users/PractitionerClientController.php:94
 * @route '/practitioner/clients/{client}'
 */
export const show = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients/{client}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::show
 * @see app/Http/Controllers/Users/PractitionerClientController.php:94
 * @route '/practitioner/clients/{client}'
 */
show.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::show
 * @see app/Http/Controllers/Users/PractitionerClientController.php:94
 * @route '/practitioner/clients/{client}'
 */
show.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::show
 * @see app/Http/Controllers/Users/PractitionerClientController.php:94
 * @route '/practitioner/clients/{client}'
 */
show.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::edit
 * @see app/Http/Controllers/Users/PractitionerClientController.php:103
 * @route '/practitioner/clients/{client}/edit'
 */
export const edit = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/practitioner/clients/{client}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::edit
 * @see app/Http/Controllers/Users/PractitionerClientController.php:103
 * @route '/practitioner/clients/{client}/edit'
 */
edit.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::edit
 * @see app/Http/Controllers/Users/PractitionerClientController.php:103
 * @route '/practitioner/clients/{client}/edit'
 */
edit.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::edit
 * @see app/Http/Controllers/Users/PractitionerClientController.php:103
 * @route '/practitioner/clients/{client}/edit'
 */
edit.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClinicalNotes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
export const updateClinicalNotes = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClinicalNotes.url(args, options),
    method: 'put',
})

updateClinicalNotes.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-clinical-notes',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClinicalNotes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
updateClinicalNotes.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateClinicalNotes.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClinicalNotes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
updateClinicalNotes.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClinicalNotes.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
export const updateClientHealthProfile = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClientHealthProfile.url(args, options),
    method: 'put',
})

updateClientHealthProfile.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-client-profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
updateClientHealthProfile.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateClientHealthProfile.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientHealthProfile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
updateClientHealthProfile.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClientHealthProfile.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientNextReviewDate
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
export const updateClientNextReviewDate = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClientNextReviewDate.url(args, options),
    method: 'put',
})

updateClientNextReviewDate.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-next-review-date',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientNextReviewDate
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
updateClientNextReviewDate.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateClientNextReviewDate.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::updateClientNextReviewDate
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
updateClientNextReviewDate.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateClientNextReviewDate.url(args, options),
    method: 'put',
})
const PractitionerClientController = { index, create, store, show, edit, updateClinicalNotes, updateClientHealthProfile, updateClientNextReviewDate }

export default PractitionerClientController