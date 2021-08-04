import types from './types'

const login = data => ({
    type: types.LOGIN_USER, 
    user: data
})

const logout = data => ({
    type: types.LOGOUT_USER
})

export default {
    login,
    logout
}