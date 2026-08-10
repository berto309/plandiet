import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
const ViewSandboxResults = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewSandboxResults.url(options),
    method: 'get',
})

ViewSandboxResults.definition = {
    methods: ["get","head"],
    url: '/practitioner/sandbox/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
ViewSandboxResults.url = (options?: RouteQueryOptions) => {
    return ViewSandboxResults.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
ViewSandboxResults.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewSandboxResults.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
ViewSandboxResults.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewSandboxResults.url(options),
    method: 'head',
})
export default ViewSandboxResults