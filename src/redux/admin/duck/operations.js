import actions from './actions'
import axios from 'axios'

const fetchUsers = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/users')

    return response.data
}

export const getAllUsers = () =>
    async (dispatch) => {
        const users = await fetchUsers()

        dispatch(actions.fetch(users))
    }