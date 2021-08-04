import types from './types'

const INITIAL_STATE = {
    data: [],
    zalogowany: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                ...state,
                data: action.user,
                zalogowany: true
            }
        
        case types.LOGOUT_USER:
            return {
                data:null,
                zalogowany:false
            }

        default:
            return state
    }
}

export default userReducer