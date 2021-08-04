import types from './types'

const INITIAL_BLACKLIST = {
    list: []
}

const blacklistReducer = (state = INITIAL_BLACKLIST, action) => {
    switch (action.type) {
        case types.ADD_LIST:
            return {
                list: action.list
            }

        case types.REMOVE_ELEMENT:
            return {
                ...state,
                list: state.list.filter((element, index) => { return (index != action.index) })
            }

        default:
            return state
    }
}

export default blacklistReducer
