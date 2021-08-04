import actions from './actions'
import axios from 'axios'

const fetchPlayers = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/members')

    return response
}

export const getAllPlayers = () =>
    async (dispatch) => {
        const playerlist = await fetchPlayers()

        dispatch(actions.add(playerlist.data))
    }

const remove = async (playerId) => {
    const response = await axios.delete('http://51.83.129.240:3333/api/auth/members/remove', {
        data: {
            discord_id: playerId
        }
    })

    return response
}

export const removeMember = (playerId, playerIndex) =>
    async (dispatch) => {
        const removeMember = await remove(playerId)

        dispatch(actions.remove(playerIndex))
    }

const fetchPlayerZvzs = async (memberId) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/findplayerzvz', {
        params: {
            userId: memberId
        }
    })

    return response
}

export const getPlayerZvzs = (memberId) =>
    async (dispatch) => {
        const getZvzsCount = await fetchPlayerZvzs(memberId)

        dispatch(actions.addTotalZvzs(getZvzsCount.data.total))
    }

const fetchPlayerLastZvz = async (memberId) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/lastplayerzvz', {
        params: {
            userId: memberId
        }
    })

    return response
}

export const getPlayerLastZvz = (memberId) =>
    async (dispatch) => {
        const lastZvz = await fetchPlayerLastZvz(memberId)

        dispatch(actions.addLastZvz(lastZvz.data))
    }

const fetchPlayerLastWeeksZvzs = async (memberId) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/findplayerlastweekzvzs', {
        params: {
            userId: memberId
        }
    })

    return response
}

export const getPlayerLastWeeksZvzs = (memberId) =>
    async (dispatch) => {
        const lastWeeksZvzs = await fetchPlayerLastWeeksZvzs(memberId)

        dispatch(actions.addLastWeeksZvzs(lastWeeksZvzs.data))
    }

const fetchSummaryZvzs = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/summary')

    return response
}

export const getSummaryZvzs = () =>
    async (dispatch) => {
        const summary = await fetchSummaryZvzs()

        dispatch(actions.addSummaryZvzs(summary.data))
    }

const fetchSummaryBetweenDates = async (from, to) => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/zvz/summarybydate', {
        params: {
            from: from,
            to: to
        }
    })

    return response
}

export const getSummaryBetweenDates = (from, to) =>
    async (dispatch) => {
        const summarybetween = await fetchSummaryBetweenDates(from, to)

        return await dispatch(actions.addSummaryBetweenDates(summarybetween.data))
    }