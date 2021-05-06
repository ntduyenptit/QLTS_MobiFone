export const TOANBOTHIETBI = '[TOANBOTHIETBI]'
export const TOANBOTHIETBI_LOADING = `${TOANBOTHIETBI} is loading`
export const TOANBOTHIETBI_DATA = `${TOANBOTHIETBI} Set toanbotaisan data to store`
export const TOANBOTHIETBI_FAILED = `${TOANBOTHIETBI} Get toanbotaisan data failed`

export const toanbothietbiLoading = () => ({
    type: TOANBOTHIETBI_LOADING,
    payload: {},
})

export const toanbothietbiGetData = (data) => ({
    type: TOANBOTHIETBI_DATA,
    payload: {
        data
    },
})

export const toanbothietbiFailed = () => ({
    type: TOANBOTHIETBI_FAILED,
    payload: {},
})