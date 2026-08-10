import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::index
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:12
 * @route '/admin/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::index
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:12
 * @route '/admin/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::index
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:12
 * @route '/admin/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::index
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:12
 * @route '/admin/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::update
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:17
 * @route '/admin/settings/{setting}'
 */
export const update = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/settings/{setting}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::update
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:17
 * @route '/admin/settings/{setting}'
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
* @see \App\Http\Controllers\Settings\AdminSettingsController::update
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:17
 * @route '/admin/settings/{setting}'
 */
update.put = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Settings\AdminSettingsController::update
 * @see app/Http/Controllers/Settings/AdminSettingsController.php:17
 * @route '/admin/settings/{setting}'
 */
update.patch = (args: { setting: string | number } | [setting: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
const AdminSettingsController = { index, update }

export default AdminSettingsController