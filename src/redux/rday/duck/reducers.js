import types from './types'
import update from 'react-addons-update'

const INITIAL_PLAYERS = {
    sets: [],
    declarations: [],
    rday: [],
    shameList: []
}

const rdaySetsReducer = (state = INITIAL_PLAYERS, action) => {
    switch (action.type) {
        case types.ADD_SET:
            return {
                ...state,
                list: [...state.list, action.item]

            }
        case types.FETCH_SETS:
            return {
                ...state,
                list: action.sets
            }
        case types.FETCH_ITEMS:
            return {
                ...state,
                items: action.item
            }
        case types.FETCH_DECLARATIONS:
            return {
                ...state,
                declarations: action.item.declarations,
                rday: action.item.findRday,
                count: action.item.count
            }
        case types.REMOVE_DECLARATION:
            return {
                ...state,
                declarations: state.declarations.filter((element, index) => { return (index != action.item) })
            }
        case types.REMOVE_SET:
            return {
                ...state,
                list: state.list.filter((element, index) => { return (index != action.item) })
            }
        case types.EDIT_SET:
            return update(state, {
                list: { [action.index]: { $set: action.item } }
            }, console.log(action.item));
        case types.ADD_SHAME_LIST:
            return {
                ...state,
                shameList: action.item
            }
        default:
            return state
    }
}

export default rdaySetsReducer