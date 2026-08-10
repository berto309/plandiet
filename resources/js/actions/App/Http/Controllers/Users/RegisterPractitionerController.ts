import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\RegisterPractitionerController::__invoke
 * @see app/Http/Controllers/Users/RegisterPractitionerController.php:21
 * @route '/register-practitioner'
 */
const RegisterPractitionerController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RegisterPractitionerController.url(options),
    method: 'post',
})

RegisterPractitionerController.definition = {
    methods: ["post"],
    url: '/register-practitioner',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\RegisterPractitionerController::__invoke
 * @see app/Http/Controllers/Users/RegisterPractitionerController.php:21
 * @route '/register-practitioner'
 */
RegisterPractitionerController.url = (options?: RouteQueryOptions) => {
    return RegisterPractitionerController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\RegisterPractitionerController::__invoke
 * @see app/Http/Controllers/Users/RegisterPractitionerController.php:21
 * @route '/register-practitioner'
 */
RegisterPractitionerController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RegisterPractitionerController.url(options),
    method: 'post',
})
export default RegisterPractitionerController