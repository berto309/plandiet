import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/verification-queue',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VerificationQueue\VerificationQueueController::__invoke
 * @see app/Http/Controllers/VerificationQueue/VerificationQueueController.php:13
 * @route '/admin/verification-queue'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const verificationQueue = {
    index: Object.assign(index, index),
}

export default verificationQueue