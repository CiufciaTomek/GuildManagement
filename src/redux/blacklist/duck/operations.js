import actions from './actions'
import axios from 'axios'

const fetchBlacklist = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/blacklist')

    return response
}

export const getBlacklist = () =>
    async (dispatch) => {
        const blacklist = await fetchBlacklist()

        dispatch(actions.addList(blacklist.data))
    }

const remove = async (playerId) => {
    const response = await axios.delete('http://51.83.129.240:3333/api/auth/blacklist/remove', {
        data: {
            nick: playerId
        }
    })

    return response
}

export const removeElement = (playerId, playerIndex) =>
    async (dispatch) => {
        const removeElement = await remove(playerId)

        dispatch(actions.remove(playerIndex))
    }