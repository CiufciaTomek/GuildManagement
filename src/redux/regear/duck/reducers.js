import types from './types'

const INITIAL_STATE = {
    data: [],
    count: []
}

const regearReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_REGEAR:
            return {
                ...state,
                data: action.item,
                count: action.count
            }
        case types.APPLY_REGEAR:
            return {
                ...state,
                data: state.data.filter((element, index) => { return (index != action.item) })
            }
        case types.REJECT_REGEAR:
            return {
                ...state,
                data: state.data.filter((element, index) => { return (index != action.item) })
            }
        default:
            return state
    }
}

export default regearReducer