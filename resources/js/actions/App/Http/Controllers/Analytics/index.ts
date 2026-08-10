import Admin from './Admin'
import Client from './Client'
import Practitioner from './Practitioner'
const Analytics = {
    Admin: Object.assign(Admin, Admin),
Client: Object.assign(Client, Client),
Practitioner: Object.assign(Practitioner, Practitioner),
}

export default Analytics