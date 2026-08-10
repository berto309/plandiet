import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
const ViewPractitionerInviteController = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPractitionerInviteController.url(args, options),
    method: 'get',
})

ViewPractitionerInviteController.definition = {
    methods: ["get","head"],
    url: '/invitation/{invite}/practitioner/{practitioner}/invite/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
ViewPractitionerInviteController.url = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    invite: args[0],
                    practitioner: args[1],
                    token: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invite: typeof args.invite === 'object'
                ? args.invite.id
                : args.invite,
                                practitioner: typeof args.practitioner === 'object'
                ? args.practitioner.id
                : args.practitioner,
                                token: args.token,
                }

    return ViewPractitionerInviteController.definition.url
            .replace('{invite}', parsedArgs.invite.toString())
            .replace('{practitioner}', parsedArgs.practitioner.toString())
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
ViewPractitionerInviteController.get = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPractitionerInviteController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
ViewPractitionerInviteController.head = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewPractitionerInviteController.url(args, options),
    method: 'head',
})
export default ViewPractitionerInviteController