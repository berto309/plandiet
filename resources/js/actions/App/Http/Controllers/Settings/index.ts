import AdminSettingsController from './AdminSettingsController'
import PractitionerSettingsController from './PractitionerSettingsController'
const Settings = {
    AdminSettingsController: Object.assign(AdminSettingsController, AdminSettingsController),
PractitionerSettingsController: Object.assign(PractitionerSettingsController, PractitionerSettingsController),
}

export default Settings