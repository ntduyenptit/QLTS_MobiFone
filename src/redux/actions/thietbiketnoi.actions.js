export const TOANBOTAITHIETBI = '[TOANBOTHIETBI]'
export const TOANBOTAITHIETBI_LOADING = `${TOANBOTAITHIETBI} is loading`
export const TOANBOTAITHIETBI_DATA = `${TOANBOTAITHIETBI} Set toanbotaisan data to store`
export const TOANBOTAITHIETBI_FAILED = `${TOANBOTAITHIETBI} Get toanbotaisan data failed`

export const toanbothietbiLoading = () => ({
    type: TOANBOTAITHIETBI_LOADING,
    payload: {},
})

export const toanbothietbiGetData = (data) => ({
    type: TOANBOTAITHIETBI_DATA,
    payload: {
        data
    },
})

export const toanbothietbiFailed = () => ({
    type: TOANBOTAITHIETBI_FAILED,
    payload: {},
})