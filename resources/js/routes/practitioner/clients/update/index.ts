import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clinical_notes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
export const clinical_notes = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: clinical_notes.url(args, options),
    method: 'put',
})

clinical_notes.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-clinical-notes',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clinical_notes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
clinical_notes.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return clinical_notes.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::clinical_notes
 * @see app/Http/Controllers/Users/PractitionerClientController.php:191
 * @route '/practitioner/clients/{client}/update-clinical-notes'
 */
clinical_notes.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: clinical_notes.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::profile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
export const profile = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: profile.url(args, options),
    method: 'put',
})

profile.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-client-profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::profile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
profile.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return profile.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::profile
 * @see app/Http/Controllers/Users/PractitionerClientController.php:175
 * @route '/practitioner/clients/{client}/update-client-profile'
 */
profile.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: profile.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::next_review_date
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
export const next_review_date = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: next_review_date.url(args, options),
    method: 'put',
})

next_review_date.definition = {
    methods: ["put"],
    url: '/practitioner/clients/{client}/update-next-review-date',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::next_review_date
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
next_review_date.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return next_review_date.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionerClientController::next_review_date
 * @see app/Http/Controllers/Users/PractitionerClientController.php:211
 * @route '/practitioner/clients/{client}/update-next-review-date'
 */
next_review_date.put = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: next_review_date.url(args, options),
    method: 'put',
})
const update = {
    clinical_notes: Object.assign(clinical_notes, clinical_notes),
profile: Object.assign(profile, profile),
next_review_date: Object.assign(next_review_date, next_review_date),
}

export default update