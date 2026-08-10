import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\Sandbox\ShowSandboxTestResult::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ShowSandboxTestResult.php:17
 * @route '/practitioner/sandbox/{sandbox}/results'
 */
export const show = (args: { sandbox: number | { id: number } } | [sandbox: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/practitioner/sandbox/{sandbox}/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\ShowSandboxTestResult::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ShowSandboxTestResult.php:17
 * @route '/practitioner/sandbox/{sandbox}/results'
 */
show.url = (args: { sandbox: number | { id: number } } | [sandbox: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sandbox: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sandbox: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sandbox: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sandbox: typeof args.sandbox === 'object'
                ? args.sandbox.id
                : args.sandbox,
                }

    return show.definition.url
            .replace('{sandbox}', parsedArgs.sandbox.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\ShowSandboxTestResult::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ShowSandboxTestResult.php:17
 * @route '/practitioner/sandbox/{sandbox}/results'
 */
show.get = (args: { sandbox: number | { id: number } } | [sandbox: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Sandbox\ShowSandboxTestResult::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ShowSandboxTestResult.php:17
 * @route '/practitioner/sandbox/{sandbox}/results'
 */
show.head = (args: { sandbox: number | { id: number } } | [sandbox: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const results = {
    show: Object.assign(show, show),
}

export default results