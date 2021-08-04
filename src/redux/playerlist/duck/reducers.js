import types from './types'

const INITIAL_PLAYERS = {
    list: [],
    memberInfo: [],
    shameList: [],
    summary: [],
    summaryBetweenDates: []
}

const playerListReducer = (state = INITIAL_PLAYERS, action) => {
    switch (action.type) {
        case types.ADD_PLAYER:
            return {
                list: action.playerlist
            }
        case types.REMOVE_PLAYER:
            return {
                ...state,
                list: state.list.filter((element, index) => { return (index != action.index) })
            }
        case types.ADD_TOTAL_ZVZ:
            return {
                ...state,
                memberInfo: {
                    ...state.memberInfo,
                    totalZvzs: action.item
                }
            }
        case types.ADD_LAST_ZVZ:
            return {
                ...state,
                memberInfo: {
                    ...state.memberInfo,
                    lastZvz: action.item.created_at
                }
            }
        case types.ADD_SUMMARY_ZVZS:
            return {
                ...state,
                summary: action.item
            }
        case types.ADD_SUMMARY_BETWEEN_DATES:
            return {
                ...state,
                summaryBetweenDates: action.item
            }
        case types.ADD_LAST_WEEKS_ZVZS:
            return {
                ...state,
                memberInfo: {
                    ...state.memberInfo,
                    lastWeekZvz: action.item.lastWeek,
                    lastTwoWeeksZvzs: action.item.lastTwoWeeks,
                    lastMonth: action.item.lastMonth
                }
            }
        default:
            return state
    }
}

export default playerListReducer