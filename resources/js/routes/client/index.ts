import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import invite9ae5a1 from './invite'
import mealPlans from './meal-plans'
import profile937a89 from './profile'
/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
export const invite = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invite.url(args, options),
    method: 'get',
})

invite.definition = {
    methods: ["get","head"],
    url: '/invitation/{invite}/practitioner/{practitioner}/invite/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
invite.url = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions) => {
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

    return invite.definition.url
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
invite.get = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invite.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Invites\ViewPractitionerInviteController::__invoke
 * @see app/Http/Controllers/Invites/ViewPractitionerInviteController.php:19
 * @route '/invitation/{invite}/practitioner/{practitioner}/invite/{token}'
 */
invite.head = (args: { invite: number | { id: number }, practitioner: number | { id: number }, token: string | number } | [invite: number | { id: number }, practitioner: number | { id: number }, token: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invite.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/client',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Analytics\Client\ClientDashboardController::__invoke
 * @see app/Http/Controllers/Analytics/Client/ClientDashboardController.php:17
 * @route '/client'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
export const mealHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mealHistory.url(options),
    method: 'get',
})

mealHistory.definition = {
    methods: ["get","head"],
    url: '/client/meal-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
mealHistory.url = (options?: RouteQueryOptions) => {
    return mealHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
mealHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mealHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\MealHistoryController::__invoke
 * @see app/Http/Controllers/Users/MealHistoryController.php:14
 * @route '/client/meal-history'
 */
mealHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mealHistory.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\ClientProfileController::profile
 * @see app/Http/Controllers/Users/ClientProfileController.php:17
 * @route '/client/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/client/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\ClientProfileController::profile
 * @see app/Http/Controllers/Users/ClientProfileController.php:17
 * @route '/client/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ClientProfileController::profile
 * @see app/Http/Controllers/Users/ClientProfileController.php:17
 * @route '/client/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Users\ClientProfileController::profile
 * @see app/Http/Controllers/Users/ClientProfileController.php:17
 * @route '/client/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})
const client = {
    invite: Object.assign(invite, invite9ae5a1),
dashboard: Object.assign(dashboard, dashboard),
mealPlans: Object.assign(mealPlans, mealPlans),
mealHistory: Object.assign(mealHistory, mealHistory),
profile: Object.assign(profile, profile937a89),
}

export default client