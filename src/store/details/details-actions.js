export const SET_LOADING = '@@details/SET_LOADING'
export const SET_ERROR = '@@details/SET_ERROR'
export const SET_COUNTRY = '@@details/SET_COUNTRY'
export const CLEAR_DETAILS = '@@details/CLEAR_DETAILS'
export const SET_NEIGHBORS = '@@details/SET_NEIGHBORS'

// ============ AC ============ //
export const setLoading = () => ({ type: SET_LOADING })
export const setError = (err) => ({ type: SET_ERROR, payload: err })
export const setCountry = (country) => ({ type: SET_COUNTRY, payload: country })
export const clearDetails = () => ({ type: CLEAR_DETAILS })
const setNeignbors = (countries) => ({ type: SET_NEIGHBORS, payload: countries })

// ============ THUNK ============ //
export const loadCountryByName = (name) => (dispatch, _, { client, api }) => {
    dispatch(setLoading())
    client.get(api.searchByCountry(name))
        .then(({ data }) => dispatch(setCountry(data[0])))
        .then(err => dispatch(setError(err.message)))
}


export const loadNeaighborsByBorder = (borders) => (dispatch, _, { client, api }) => {
    client.get(api.filterByCode(borders))
        .then(({ data }) => dispatch(setNeignbors(data.map(c => c.name))))
        .catch((err) => console.log(err))
}