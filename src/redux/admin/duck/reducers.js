import types from './types'

const INITIAL_STATE = {
    userslist: []
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_USERS:
            return {
                ...state,
                userslist: action.item
            }

        default:
            return state
    }
}

export default adminReducer
