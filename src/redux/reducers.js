import { combineReducers } from 'redux'
import userReducer from './user/duck'
import playerListReducer from './playerlist/duck'
import blacklistReducer from './blacklist/duck'
import modalReducer from './zvz/duck'
import rdaySetsReducer from './rday/duck'
import regearReducer from './regear/duck'
import adminReducer from './admin/duck'
import armoryReducer from './armory/duck'

const rootReducer = combineReducers({
    user: userReducer,
    playerlist: playerListReducer,
    blacklist: blacklistReducer,
    modal: modalReducer,
    sets: rdaySetsReducer,
    regear: regearReducer,
    admin: adminReducer,
    armory: armoryReducer
})

export default rootReducer