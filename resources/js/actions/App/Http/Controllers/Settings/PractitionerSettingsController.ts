import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::index
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:12
 * @route '/practitioner/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/practitioner/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::index
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:12
 * @route '/practitioner/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::index
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:12
 * @route '/practitioner/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::index
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:12
 * @route '/practitioner/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::update
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:17
 * @route '/practitioner/settings/{setting}'
 */
export const update = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/practitioner/settings/{setting}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::update
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:17
 * @route '/practitioner/settings/{setting}'
 */
update.url = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    setting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        setting: args.setting,
                }

    return update.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::update
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:17
 * @route '/practitioner/settings/{setting}'
 */
update.put = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Settings\PractitionerSettingsController::update
 * @see app/Http/Controllers/Settings/PractitionerSettingsController.php:17
 * @route '/practitioner/settings/{setting}'
 */
update.patch = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
const PractitionerSettingsController = { index, update }

export default PractitionerSettingsController