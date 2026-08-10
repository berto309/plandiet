import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
const ViewSandbox = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewSandbox.url(options),
    method: 'get',
})

ViewSandbox.definition = {
    methods: ["get","head"],
    url: '/practitioner/sandbox',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
ViewSandbox.url = (options?: RouteQueryOptions) => {
    return ViewSandbox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
ViewSandbox.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewSandbox.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
ViewSandbox.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewSandbox.url(options),
    method: 'head',
})
export default ViewSandbox