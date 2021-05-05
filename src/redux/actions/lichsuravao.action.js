export const TOANBOTAISANRAVAO = '[TOANBOTAISANRAVAO]'
export const TOANBOTAISANRAVAO_LOADING = `${TOANBOTAISANRAVAO} is loading`
export const TOANBOTAISANRAVAO_DATA = `${TOANBOTAISANRAVAO} Set toanbotaisan data to store`
export const TOANBOTAISANRAVAO_FAILED = `${TOANBOTAISANRAVAO} Get toanbotaisan data failed`

// toàn bộ tài sản
export const toanbotaisanRavaoLoading = () => ({
    type: TOANBOTAISANRAVAO_LOADING,
    payload: {},
})

export const toanboTsRavaoGetData = (data) => ({
    type: TOANBOTAISANRAVAO_DATA,
    payload: {
        data
    },
})

export const toanboTsRavaoFailed = () => ({
    type: TOANBOTAISANRAVAO_FAILED,
    payload: {},
})
//
