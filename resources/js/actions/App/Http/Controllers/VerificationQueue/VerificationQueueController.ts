import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
const VerificationQueueController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VerificationQueueController.url(options),
    method: 'get',
})

VerificationQueueController.definition = {
    methods: ["get","head"],
    url: '/admin/verification-queue',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
VerificationQueueController.url = (options?: RouteQueryOptions) => {
    return VerificationQueueController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
VerificationQueueController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VerificationQueueController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
VerificationQueueController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: VerificationQueueController.url(options),
    method: 'head',
})
export default VerificationQueueController