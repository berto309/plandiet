import Users from './Users'
import Analytics from './Analytics'
import VerificationQueue from './VerificationQueue'
import Tools from './Tools'
import Settings from './Settings'
import Audits from './Audits'
import Invites from './Invites'
import Meal from './Meal'
const Controllers = {
    Users: Object.assign(Users, Users),
Analytics: Object.assign(Analytics, Analytics),
VerificationQueue: Object.assign(VerificationQueue, VerificationQueue),
Tools: Object.assign(Tools, Tools),
Settings: Object.assign(Settings, Settings),
Audits: Object.assign(Audits, Audits),
Invites: Object.assign(Invites, Invites),
Meal: Object.assign(Meal, Meal),
}

export default Controllers