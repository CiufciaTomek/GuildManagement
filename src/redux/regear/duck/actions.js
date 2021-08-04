import types from './types'

const fetch = (item, count) => ({
    type: types.FETCH_REGEAR,
    item,
    count
})

const applyRegear = item => ({
    type: types.APPLY_REGEAR,
    item
})

const rejectRegear = item => ({
    type: types.REJECT_REGEAR,
    item
})

export default {
    fetch,
    applyRegear,
    rejectRegear
}