import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::index
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:23
 * @route '/admin/practitioners'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/practitioners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::index
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:23
 * @route '/admin/practitioners'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::index
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:23
 * @route '/admin/practitioners'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::index
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:23
 * @route '/admin/practitioners'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::show
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:32
 * @route '/admin/practitioners/{practitioner}'
 */
export const show = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/practitioners/{practitioner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::show
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:32
 * @route '/admin/practitioners/{practitioner}'
 */
show.url = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { practitioner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { practitioner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    practitioner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        practitioner: typeof args.practitioner === 'object'
                ? args.practitioner.id
                : args.practitioner,
                }

    return show.definition.url
            .replace('{practitioner}', parsedArgs.practitioner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::show
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:32
 * @route '/admin/practitioners/{practitioner}'
 */
show.get = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::show
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:32
 * @route '/admin/practitioners/{practitioner}'
 */
show.head = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::update
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:52
 * @route '/admin/practitioners/{practitioner}'
 */
export const update = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/practitioners/{practitioner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::update
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:52
 * @route '/admin/practitioners/{practitioner}'
 */
update.url = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { practitioner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { practitioner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    practitioner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        practitioner: typeof args.practitioner === 'object'
                ? args.practitioner.id
                : args.practitioner,
                }

    return update.definition.url
            .replace('{practitioner}', parsedArgs.practitioner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::update
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:52
 * @route '/admin/practitioners/{practitioner}'
 */
update.put = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::update
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:52
 * @route '/admin/practitioners/{practitioner}'
 */
update.patch = (args: { practitioner: number | { id: number } } | [practitioner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::destroy
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:95
 * @route '/admin/practitioners/{practitioner}'
 */
export const destroy = (args: { practitioner: string | number } | [practitioner: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/practitioners/{practitioner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::destroy
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:95
 * @route '/admin/practitioners/{practitioner}'
 */
destroy.url = (args: { practitioner: string | number } | [practitioner: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { practitioner: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    practitioner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        practitioner: args.practitioner,
                }

    return destroy.definition.url
            .replace('{practitioner}', parsedArgs.practitioner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::destroy
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:95
 * @route '/admin/practitioners/{practitioner}'
 */
destroy.delete = (args: { practitioner: string | number } | [practitioner: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::updateVerificationStatus
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:72
 * @route '/admin/practitioners/update-verification-status/{id}'
 */
export const updateVerificationStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateVerificationStatus.url(args, options),
    method: 'put',
})

updateVerificationStatus.definition = {
    methods: ["put"],
    url: '/admin/practitioners/update-verification-status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::updateVerificationStatus
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:72
 * @route '/admin/practitioners/update-verification-status/{id}'
 */
updateVerificationStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateVerificationStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\PractitionersManagementController::updateVerificationStatus
 * @see app/Http/Controllers/Users/PractitionersManagementController.php:72
 * @route '/admin/practitioners/update-verification-status/{id}'
 */
updateVerificationStatus.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateVerificationStatus.url(args, options),
    method: 'put',
})
const PractitionersManagementController = { index, show, update, destroy, updateVerificationStatus }

export default PractitionersManagementController