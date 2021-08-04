import types from './types'

const add = item => ({
    type: types.ADD_PLAYER,
    playerlist: item
})

const remove = item => ({
    type: types.REMOVE_PLAYER,
    index: item
})

const addTotalZvzs = item => ({
    type: types.ADD_TOTAL_ZVZ,
    item
})

const addLastZvz = item => ({
    type: types.ADD_LAST_ZVZ,
    item
})

const addLastWeeksZvzs = item => ({
    type: types.ADD_LAST_WEEKS_ZVZS,
    item
})

const addSummaryZvzs = item => ({
    type: types.ADD_SUMMARY_ZVZS,
    item
})

const addSummaryBetweenDates = item => ({
    type: types.ADD_SUMMARY_BETWEEN_DATES,
    item
})

export default {
    add,
    remove,
    addTotalZvzs,
    addLastZvz,
    addSummaryZvzs,
    addLastWeeksZvzs,
    addSummaryBetweenDates
}