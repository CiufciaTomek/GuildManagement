import types from './types'
import update from 'react-addons-update'

const INITIAL_MODAL = {
    data: null,
    zvzs: null,
    zvzId: null,
    zvzIndex: null,
    openModal: false,
}
const modalReducer = (state = INITIAL_MODAL, action) => {
    switch (action.type) {
        case types.ADD_DATA:
            return {
                ...state,
                data: action.data,
            }
        case types.ADD_ZVZS:
            return {
                ...state,
                zvzs: action.data
            }
        case types.OPEN_MODAL:
            return {
                ...state,
                zvzId: action.id,
                zvzIndex: action.index,
                openModal: true
            }
        case types.CLOSE_MODAL:
            return {
                ...state,
                openModal: false
            }
        case types.ADD_PLAYER_TO_ZVZ:
            return {
                ...state,
                data: [...state.data, action.data]
            }
        case types.INCREASE_COUNT:
            const increase = state.zvzs[action.data].__meta__.zvzPlayers_count + 1;
            return update(state, {
                zvzs: {
                    [action.data]: {
                        __meta__: { zvzPlayers_count: { $set: increase } }
                    }
                }
            });
        case types.REMOVE_ZVZ_PLAYER:
            return {
                ...state,
                data: state.data.filter((element, index) => { return (index != action.index) })
            }
        case types.DECREASE_COUNT:
            const decrease = state.zvzs[action.data].__meta__.zvzPlayers_count - 1;
            return update(state, {
                zvzs: {
                    [action.data]: {
                        __meta__: {
                            zvzPlayers_count: { $set: decrease }
                        }
                    }
                }
            })
        case types.CLEAR_ZVZ:
            return {
                ...state,
                zvzs: []
            }
        default:
            return state
    }
}

export default modalReducer