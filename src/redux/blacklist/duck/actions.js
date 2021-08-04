import types from './types'

const addList = item => ({
    type: types.ADD_LIST,
    list: item
})

const remove = item => ({
    type: types.REMOVE_ELEMENT,
    index: item
})

export default {
    addList,
    remove
}