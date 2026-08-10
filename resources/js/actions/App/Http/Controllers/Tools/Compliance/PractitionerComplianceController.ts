import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::index
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:21
 * @route '/practitioner/compliance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/compliance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::index
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:21
 * @route '/practitioner/compliance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::index
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:21
 * @route '/practitioner/compliance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::index
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:21
 * @route '/practitioner/compliance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::show
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:32
 * @route '/practitioner/{client}/compliance'
 */
export const show = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/practitioner/{client}/compliance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::show
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:32
 * @route '/practitioner/{client}/compliance'
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
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::show
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:32
 * @route '/practitioner/{client}/compliance'
 */
show.get = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Compliance\PractitionerComplianceController::show
 * @see app/Http/Controllers/Tools/Compliance/PractitionerComplianceController.php:32
 * @route '/practitioner/{client}/compliance'
 */
show.head = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const PractitionerComplianceController = { index, show }

export default PractitionerComplianceController