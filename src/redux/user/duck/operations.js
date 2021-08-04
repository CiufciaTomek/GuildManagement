import actions from './actions'
import axios from 'axios'

const fetchUser = async (loginData) => {
    const response = await axios.post('http://51.83.129.240:3333/api/auth/login', {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        login: loginData.login,
        password: loginData.password
    })

    return response
}

export const loginUser = (loginData) =>
    async (dispatch) => {
        const user = await fetchUser(loginData)
        if (user.status === 202) {
            let token = { type: user.data.type, token: user.data.token }
            localStorage.setItem('Authorization', JSON.stringify(user.data.token))
            axios.defaults.headers.common['Authorization'] = ("Bearer " + user.data.token)
            dispatch(actions.login(user.data))
        }
        return user.data
    }

export const checkToken = () =>
    async (dispatch) => {
        await axios.get('http://51.83.129.240:3333/api/auth/checktoken', {
            headers: {
                'Authorization': ("Bearer " + JSON.parse(localStorage.getItem('Authorization')))
            }
        })
            .then((response) => {
                axios.defaults.headers.common['Authorization'] = ("Bearer " + JSON.parse(localStorage.getItem('Authorization')))
                dispatch(actions.login(response.data))
            })
            .catch((e) => {
                localStorage.removeItem('Authorization')
            })
    }

export const logout = () => 
    async (dispatch) => {
        dispatch(actions.logout())
        localStorage.removeItem('Authorization')
    }