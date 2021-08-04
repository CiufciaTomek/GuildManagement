import types from './types'
import update from 'react-addons-update'

const INITIAL_STATE = {
    list: []
}

const armoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                list: action.item
            }
        case types.CHANGE_VALUE:
            const value = state.list[action.index].count += parseInt(action.value)
            return update(state, {
                list: {
                    [action.index]: {
                        count: {$set: value}
                    }
                }
            })
        default:
            return state
    }
}

export default armoryReducer
