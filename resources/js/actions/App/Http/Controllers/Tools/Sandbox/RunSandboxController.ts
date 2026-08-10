import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
const RunSandboxController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RunSandboxController.url(options),
    method: 'post',
})

RunSandboxController.definition = {
    methods: ["post"],
    url: '/practitioner/sandbox/run',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
RunSandboxController.url = (options?: RouteQueryOptions) => {
    return RunSandboxController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Tools\Sandbox\RunSandboxController::__invoke
 * @see app/Http/Controllers/Tools/Sandbox/RunSandboxController.php:15
 * @route '/practitioner/sandbox/run'
 */
RunSandboxController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RunSandboxController.url(options),
    method: 'post',
})
export default RunSandboxController