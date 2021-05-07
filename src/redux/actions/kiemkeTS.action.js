export const TOANBOKIEMKE = '[TOANBOKIEMKE]'
export const TOANBOKIEMKE_LOADING = `${TOANBOKIEMKE} is loading`
export const TOANBOKIEMKE_DATA = `${TOANBOKIEMKE} Set toanbokiemke data to store`
export const TOANBOKIEMKE_FAILED = `${TOANBOKIEMKE} Get toanbokiemke data failed`

export const toanbokiemkeLoading = () => ({
    type: TOANBOKIEMKE_LOADING,
    payload: {},
})

export const toanbokiemkeGetData = (data) => ({
    type: TOANBOKIEMKE_DATA,
    payload: {
        data
    },
})

export const toanbokiemkeFailed = () => ({
    type: TOANBOKIEMKE_FAILED,
    payload: {},
})