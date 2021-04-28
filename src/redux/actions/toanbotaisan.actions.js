export const TOANBOTAISAN = '[TOANBOTAISAN]'
export const TOANBOTAISAN_LOADING = `${TOANBOTAISAN} is loading`
export const TOANBOTAISAN_DATA = `${TOANBOTAISAN} Set toanbotaisan data to store`
export const TOANBOTAISAN_FAILED = `${TOANBOTAISAN} Get toanbotaisan data failed`

export const toanbotaisanLoading = () => ({
    type: TOANBOTAISAN_LOADING,
    payload: {},
})

export const toanbotaisanGetData = (data) => ({
    type: TOANBOTAISAN_DATA,
    payload: {
        data
    },
})

export const toanbotaisanFailed = () => ({
    type: TOANBOTAISAN_FAILED,
    payload: {},
})