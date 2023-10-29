import { SET_LOADING, SET_ERROR, SET_COUNTRY, CLEAR_DETAILS, SET_NEIGHBORS } from './details-actions'

const initialState = {
    currentCountry: null,
    error: null,
    status: 'idle',
    neighbors: []
}

export const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, status: 'loading', error: null }
        case SET_ERROR:
            return { ...state, error: action.payload, status: 'rejected' }
        case SET_COUNTRY:
            return { ...state, currentCountry: action.payload, status: 'received' }
        case CLEAR_DETAILS:
            return initialState
        case SET_NEIGHBORS:
            return { ...state, neighbors: action.payload }
        default:
            return state
    }
}