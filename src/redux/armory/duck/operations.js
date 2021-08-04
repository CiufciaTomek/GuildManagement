import actions from './actions'
import axios from 'axios'

const fetchArmory = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/inventory')

    return response.data
}

export const getArmory = () =>
    async (dispatch) => {
        const armory = await fetchArmory()

        dispatch(actions.fetch(armory))
    }

const sendValue = async (id, value) => {
    const response = await axios.patch('http://51.83.129.240:3333/api/auth/inventory/item/increase', {
        id: id,
        count: value
    })

    return response.data
}

export const changeValue = (id, value, index) => 
    async (dispatch) => {
        const change = await sendValue(id, value)

        dispatch(actions.changeValue(index, value))
    }