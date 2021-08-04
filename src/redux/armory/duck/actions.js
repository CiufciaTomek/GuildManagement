import types from './types'

const fetch = item => ({
    type: types.FETCH,
    item
})

const changeValue = (index, value) => ({
    type: types.CHANGE_VALUE,
    index,
    value
})


export default {
    fetch,
    changeValue
}