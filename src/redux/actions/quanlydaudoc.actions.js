export const TOANBODAUDOCCODINH = '[TOANBODAUDOCCODINH]'
export const TOANBODAUDOCCODINH_LOADING = `${TOANBODAUDOCCODINH} is loading`
export const TOANBODAUDOCCODINH_DATA = `${TOANBODAUDOCCODINH} Set toanbotaisan data to store`
export const TOANBODAUDOCCODINH_FAILED = `${TOANBODAUDOCCODINH} Get toanbotaisan data failed`

export const DAUDOCCODINHDANGSUDUNG = '[DAUDOCCODINHDANGSUDUNG]'
export const DAUDOCCODINHDANGSUDUNG_LOADING = `${DAUDOCCODINHDANGSUDUNG} is loading`
export const DAUDOCCODINHDANGSUDUNG_DATA = `${DAUDOCCODINHDANGSUDUNG} Set taisandangsudung data to store`
export const DAUDOCCODINHDANGSUDUNG_FAILED = `${DAUDOCCODINHDANGSUDUNG} Get taisandangsudung data failed`

export const DAUDOCCODINHCHUASUDUNG = '[DAUDOCCODINHCHUASUDUNG]'
export const DAUDOCCODINHCHUASUDUNG_LOADING = `${DAUDOCCODINHCHUASUDUNG} is loading`
export const DAUDOCCODINHCHUASUDUNG_DATA = `${DAUDOCCODINHCHUASUDUNG} Set taisanchuasudung data to store`
export const DAUDOCCODINHCHUASUDUNG_FAILED = `${DAUDOCCODINHCHUASUDUNG} Get taisanchuasudung data failed`
////////
export const TOANBODAUDOCDIDONG = '[TOANBODAUDOCDIDONG]'
export const TOANBODAUDOCDIDONG_LOADING = `${TOANBODAUDOCDIDONG} is loading`
export const TOANBODAUDOCDIDONG_DATA = `${TOANBODAUDOCDIDONG} Set toanbotaisan data to store`
export const TOANBODAUDOCDIDONG_FAILED = `${TOANBODAUDOCDIDONG} Get toanbotaisan data failed`

export const DAUDOCDIDONGDANGSUDUNG = '[DAUDOCDIDONGDANGSUDUNG]'
export const DAUDOCDIDONGDANGSUDUNG_LOADING = `${DAUDOCDIDONGDANGSUDUNG} is loading`
export const DAUDOCDIDONGDANGSUDUNG_DATA = `${DAUDOCDIDONGDANGSUDUNG} Set taisandangsudung data to store`
export const DAUDOCDIDONGDANGSUDUNG_FAILED = `${DAUDOCDIDONGDANGSUDUNG} Get taisandangsudung data failed`

export const DAUDOCDIDONGCHUASUDUNG = '[DAUDOCDIDONGCHUASUDUNG]'
export const DAUDOCDIDONGCHUASUDUNG_LOADING = `${DAUDOCDIDONGCHUASUDUNG} is loading`
export const DAUDOCDIDONGCHUASUDUNG_DATA = `${DAUDOCDIDONGCHUASUDUNG} Set taisanchuasudung data to store`
export const DAUDOCDIDONGCHUASUDUNG_FAILED = `${DAUDOCDIDONGCHUASUDUNG} Get taisanchuasudung data failed`


// toàn bộ đầu đọc cố định
export const toanbodaudoccodinhLoading = () => ({
    type: TOANBODAUDOCCODINH_LOADING,
    payload: {},
})

export const toanbodaudocCodinhGetData = (data) => ({
    type: TOANBODAUDOCCODINH_DATA,
    payload: {
        data
    },
})

export const toanbodaudocCodinhFailed = () => ({
    type: TOANBODAUDOCCODINH_FAILED,
    payload: {},
})


export const daudoccodinhdangsudungLoading = () => ({
    type: DAUDOCCODINHDANGSUDUNG_LOADING,
    payload: {},
})

export const daudoccodinhdangsudungGetData = (data) => ({
    type: DAUDOCCODINHCHUASUDUNG_DATA,
    payload: {
        data
    },
})

export const daudoccodinhdangsudungFailed = () => ({
    type: DAUDOCCODINHCHUASUDUNG_FAILED,
    payload: {},
})

export const daudoccodinhchuasudungLoading = () => ({
    type: DAUDOCCODINHCHUASUDUNG_LOADING,
    payload: {},
})

export const daudoccodinhchuasudungGetData = (data) => ({
    type: DAUDOCCODINHCHUASUDUNG_DATA,
    payload: {
        data
    },
})

export const daudoccodinhchuasudungFailed = () => ({
    type: DAUDOCCODINHDANGSUDUNG_FAILED,
    payload: {},
})

///////////////////
export const toanbodaudocdidongLoading = () => ({
    type: TOANBODAUDOCDIDONG_LOADING,
    payload: {},
})

export const toanbodaudocdidongGetData = (data) => ({
    type: TOANBODAUDOCDIDONG_DATA,
    payload: {
        data
    },
})

export const toanbodaudocdidongFailed = () => ({
    type: TOANBODAUDOCDIDONG_FAILED,
    payload: {},
})


export const daudocdidongdangsudungLoading = () => ({
    type: DAUDOCDIDONGDANGSUDUNG_LOADING,
    payload: {},
})

export const daudocdidongdangsudungGetData = (data) => ({
    type: DAUDOCDIDONGDANGSUDUNG_DATA,
    payload: {
        data
    },
})

export const daudocdidongdangsudungFailed = () => ({
    type: DAUDOCDIDONGDANGSUDUNG_FAILED,
    payload: {},
})

export const daudocdidongchuasudungLoading = () => ({
    type: DAUDOCDIDONGCHUASUDUNG_LOADING,
    payload: {},
})

export const daudocdidinhchuasudungGetData = (data) => ({
    type: DAUDOCDIDONGCHUASUDUNG_DATA,
    payload: {
        data
    },
})

export const daudocdidongchuasudungFailed = () => ({
    type: DAUDOCDIDONGCHUASUDUNG_FAILED,
    payload: {},
})