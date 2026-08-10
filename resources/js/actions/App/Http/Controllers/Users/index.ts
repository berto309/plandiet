import RegisterPractitionerController from './RegisterPractitionerController'
import PractitionersManagementController from './PractitionersManagementController'
import AdminProfileController from './AdminProfileController'
import PractitionerClientController from './PractitionerClientController'
import PractitionerProfileController from './PractitionerProfileController'
import ClientAccountController from './ClientAccountController'
import MealHistoryController from './MealHistoryController'
import ClientProfileController from './ClientProfileController'
const Users = {
    RegisterPractitionerController: Object.assign(RegisterPractitionerController, RegisterPractitionerController),
PractitionersManagementController: Object.assign(PractitionersManagementController, PractitionersManagementController),
AdminProfileController: Object.assign(AdminProfileController, AdminProfileController),
PractitionerClientController: Object.assign(PractitionerClientController, PractitionerClientController),
PractitionerProfileController: Object.assign(PractitionerProfileController, PractitionerProfileController),
ClientAccountController: Object.assign(ClientAccountController, ClientAccountController),
MealHistoryController: Object.assign(MealHistoryController, MealHistoryController),
ClientProfileController: Object.assign(ClientProfileController, ClientProfileController),
}

export default Users