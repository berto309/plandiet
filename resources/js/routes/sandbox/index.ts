import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import results8ded7a from './results'
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
export const view = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/practitioner/sandbox',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
view.url = (options?: RouteQueryOptions) => {
    return view.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
view.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandbox::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandbox.php:15
 * @route '/practitioner/sandbox'
 */
view.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
export const results = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(options),
    method: 'get',
})

results.definition = {
    methods: ["get","head"],
    url: '/practitioner/sandbox/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
results.url = (options?: RouteQueryOptions) => {
    return results.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
results.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Tools\Sandbox\ViewSandboxResults::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/ViewSandboxResults.php:17
 * @route '/practitioner/sandbox/results'
 */
results.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: results.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
export const run = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: run.url(options),
    method: 'post',
})

run.definition = {
    methods: ["post"],
    url: '/practitioner/sandbox/run',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
run.url = (options?: RouteQueryOptions) => {
    return run.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
run.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: run.url(options),
    method: 'post',
})
const sandbox = {
    view: Object.assign(view, view),
results: Object.assign(results, results8ded7a),
run: Object.assign(run, run),
}

export default sandbox