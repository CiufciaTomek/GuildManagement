import types from './types'

const addData = item => ({
    type: types.ADD_DATA,
    data: item
})

const addZvzs = item => ({
    type: types.ADD_ZVZS,
    data: item
})

const clearZvzs = item => ({
    type: types.CLEAR_ZVZ
})

const openModal = item => ({
    type: types.OPEN_MODAL,
    id: item.id,
    index: item.index
})

const closeModal = item => ({
    type: types.CLOSE_MODAL
})

const addPlayerToZvz = item => ({
    type: types.ADD_PLAYER_TO_ZVZ,
    data: item
})

const increaseCount = item => ({
    type: types.INCREASE_COUNT,
    data: item
})
const decreaseCount = item => ({
    type: types.DECREASE_COUNT,
    data: item
})

const removeZvzPlayer = item => ({
    type: types.REMOVE_ZVZ_PLAYER,
    index: item
})

export default {
    addData,
    addZvzs,
    openModal,
    closeModal,
    addPlayerToZvz,
    increaseCount,
    decreaseCount,
    removeZvzPlayer,
    clearZvzs
}