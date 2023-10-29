export const selectCountriesInfo = (state) => {
    return {
        status: state.countries.status,
        error: state.countries.error,
        qty: state.countries.list.length,
    }
}

export const selectAllCountries = (state) => state.countries.list

export const selectVisibleCountries = (state, { search = '', region = '' }) => {
    return state.countries.list.filter(c => {
        return c.name.toLowerCase().includes(search.toLowerCase())
            && c.region.includes(region)
    })



}