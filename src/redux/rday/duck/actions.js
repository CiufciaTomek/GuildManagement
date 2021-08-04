import types from './types'

const add = item => ({
    type: types.ADD_SET,
    item
})

const fetch = item => ({
    type: types.FETCH_SETS,
    sets: item
})

const items = item => ({
    type: types.FETCH_ITEMS,
    item
})

const addDeclarations = item => ({
    type: types.FETCH_DECLARATIONS,
    item
})

const removeSet = item => ({
    type: types.REMOVE_SET,
    item
})

const removeDec = item => ({
    type: types.REMOVE_DECLARATION,
    item
})

const editSet = (item, index) => ({
    type: types.EDIT_SET,
    index,
    item
})


const addShameList = item => ({
    type: types.ADD_SHAME_LIST,
    item
})

export default {
    add,
    fetch,
    items,
    addDeclarations,
    removeSet,
    removeDec,
    editSet,
    addShameList
}