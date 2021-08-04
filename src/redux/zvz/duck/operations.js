import actions from './actions'
import axios from 'axios'


const fetchZvzs = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/zvzs')

    return response.data
}

export const getAllZvzs = () =>
    async (dispatch) => {
        const zvzs = await fetchZvzs()

        dispatch(actions.addZvzs(zvzs))
    }

const fetchZvzsByDate = async (from, to) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/findbydate', {
        params: {
            from: from,
            to: to
        }
    })

    return response.data
}

export const getZvzsByDate = (from, to) =>
    async (dispatch) => {
        const zvzs = await fetchZvzsByDate(from, to)

        dispatch(actions.clearZvzs())
        dispatch(actions.addZvzs(zvzs))
    }

const fetchZvz = async (zvzid) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/players', {
        params: {
            zvzid: zvzid
        }
    })

    return response.data
}

export const getZvzPlayers = (zvzid) =>
    async (dispatch) => {
        const players = await fetchZvz(zvzid)

        dispatch(actions.addData(players))
    }

export const openModal = (zvzid) =>
    async (dispatch) => {
        dispatch(actions.openModal(zvzid))
    }

export const closeModal = () =>
    async (dispatch) => {
        dispatch(actions.closeModal())
    }

const addPlayer = async (zvzid, nickname) => {
    const response = await axios.post('http://51.83.129.240:3333/api/auth/zvz/addPlayer', {
        id: nickname,
        zvz_id: zvzid
    })

    return response.data
}

export const addPlayerToZvz = (zvzid, nickname) =>
    async (dispatch) => {
        const add = await addPlayer(zvzid, nickname)

        dispatch(actions.addPlayerToZvz(add))
    }

export const increaseCount = (index) =>
    async (dispatch) => {
        dispatch(actions.increaseCount(index))
    }
export const decreaseCount = (index) =>
    async (dispatch) => {
        dispatch(actions.decreaseCount(index))
    }

const removePlayer = async (player, zvzId) => {
    const response = await axios.delete('http://51.83.129.240:3333/api/auth/zvz/removePlayer', {
        data: {
            zvzId: zvzId,
            player: player
        }
    })

    return response
}

export const removeZvzPlayer = (player, zvzId, index, zvzIndex) =>
    async (dispatch) => {
        const remove = await removePlayer(player, zvzId)
        console.log('zvzId ' + zvzId + ' player ' + player + ' index ' + index)
        dispatch(actions.decreaseCount(zvzIndex))
        dispatch(actions.removeZvzPlayer(index))
    }
