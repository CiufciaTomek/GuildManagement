import types from './types'

const fetch = item => ({
    type: types.FETCH_USERS,
    item
})


export default {
    fetch
}