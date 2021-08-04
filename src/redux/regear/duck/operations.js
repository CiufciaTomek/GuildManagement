import actions from './actions'
import axios from 'axios'

const fetchRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo')

    return response.data
}

export const getRegears = () =>
    async (dispatch) => {

        let count = {
            total: 0,
            tank: 0,
            support: 0,
            mdps: 0,
            rdps: 0,
            healer: 0
        }

        const regears = await fetchRegears()
        count = {...count, total: regears.length}
        regears.filter((e) => {
            if(e.Set.type === 'Tank') return count = {...count, tank: ++count.tank}
        })
        regears.filter((e) => {
            if(e.Set.type === 'Support') return count = {...count, support: ++count.support}
        })
        regears.filter((e) => {
            if(e.Set.type === 'Rdps') return count = {...count, rdps: ++count.rdps}
        })
        regears.filter((e) => {
            if(e.Set.type === 'Mdps') return count = {...count, mdps: ++count.mdps}
        })
        regears.filter((e) => {
            if(e.Set.type === 'Healer') return count = {...count, healer: ++count.healer}
        })
        dispatch(actions.fetch(regears, count))
    }

const fetchTanksRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo/tanks')

    return response.data
}

export const getTanksRegears = () =>
    async (dispatch) => {
        const regears = await fetchTanksRegears()
        const count = {
            total: regears.length,
            tank: regears.length,
            support: 0,
            mdps: 0,
            rdps: 0,
            healer: 0
        }

        dispatch(actions.fetch(regears, count))
    }

const fetchHealersRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo/healers')

    return response.data
}

export const getHealersRegears = () =>
    async (dispatch) => {
        const regears = await fetchHealersRegears()
        const count = {
            total: regears.length,
            tank: 0,
            support: 0,
            mdps: 0,
            rdps: 0,
            healer: regears.length
        }
        dispatch(actions.fetch(regears, count))
    }

const fetchMdpsRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo/mdps')

    return response.data
}

export const getMdpsRegears = () =>
    async (dispatch) => {
        const regears = await fetchMdpsRegears()
        const count = {
            total: regears.length,
            tank: 0,
            support: 0,
            mdps: regears.length,
            rdps: 0,
            healer: 0
        }
        dispatch(actions.fetch(regears, count))
    }

const fetchRdpsRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo/rdps')

    return response.data
}

export const getRdpsRegears = () =>
    async (dispatch) => {
        const regears = await fetchRdpsRegears()
        const count = {
            total: regears.length,
            tank: 0,
            support: 0,
            mdps: 0,
            rdps: regears.length,
            healer: 0
        }
        dispatch(actions.fetch(regears, count))
    }

const fetchSupportsRegears = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/regear/todo/supports')

    return response.data
}

export const getSupportsRegears = () =>
    async (dispatch) => {
        const regears = await fetchSupportsRegears()
        const count = {
            total: regears.length,
            tank: 0,
            support: regears.length,
            mdps: 0,
            rdps: 0,
            healer: 0
        }
        dispatch(actions.fetch(regears, count))
    }

const applyRegear = async (id) => {
    const response = await axios.patch('http://51.83.129.240:3333/api/auth/regear/apply', {
        id: id
    })

    return response
}

export const applyPlayerRegear = (id, index) =>
    async (dispatch) => {
        const apply = await applyRegear(id)

        dispatch(actions.applyRegear(index))
    }

const rejectRegear = async (id) => {
    const response = await axios.patch('http://51.83.129.240:3333/api/auth/regear/reject', {
        id: id
    })

    return response
}

export const rejectPlayerRegear = (id, index) =>
    async (dispatch) => {
        const reject = await rejectRegear(id)

        dispatch(actions.rejectRegear(index))
    }