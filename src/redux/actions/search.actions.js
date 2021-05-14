export const SEARCH = '[SEARCH]'
export const SEARCH_ADD = `${SEARCH} add text search`
export const SEARCH_REMOVE = `${SEARCH} remove text search`

export const addSearch = (data) => ({
    type: SEARCH_ADD,
    payload: data,
})

export const removeSearch = (data) => ({
    type: SEARCH_REMOVE,
    payload: data,
})