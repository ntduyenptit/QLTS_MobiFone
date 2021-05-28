export const TOANBOTAISAN = '[TOANBOTAISAN]';
export const TOANBOTAISAN_LOADING = `${TOANBOTAISAN} is loading`;
export const TOANBOTAISAN_DATA = `${TOANBOTAISAN} Set toanbotaisan data to store`;
export const TOANBOTAISAN_FAILED = `${TOANBOTAISAN} Get toanbotaisan data failed`;
export const TOANBOTAISAN_REMOVE = `${TOANBOTAISAN} Remove all toanbotaisan`

export const TAISANMAT = '[TAISANMAT]'
export const TAISANMAT_LOADING = `${TAISANMAT} is loading`
export const TAISANMAT_DATA = `${TAISANMAT} Set taisanmat data to store`
export const TAISANMAT_FAILED = `${TAISANMAT} Get taisanmat data failed`
export const TAISANMAT_REMOVE = `${TAISANMAT} Remove all taisanmat`

export const TAISANHONG = '[TAISANHONG]'
export const TAISANHONG_LOADING = `${TAISANHONG} is loading`
export const TAISANHONG_DATA = `${TAISANHONG} Set taisanhong data to store`
export const TAISANHONG_FAILED = `${TAISANHONG} Get taisanhong data failed`
export const TAISANHONG_REMOVE = `${TAISANHONG} Remove all taisanhong`

export const TAISANHUY = '[TAISANHUY]'
export const TAISANHUY_LOADING = `${TAISANHUY} is loading`
export const TAISANHUY_DATA = `${TAISANHUY} Set taisanhuy data to store`
export const TAISANHUY_FAILED = `${TAISANHUY} Get taisanhuy data failed`
export const TAISANHUY_REMOVE = `${TAISANHUY} Remove all taisanhuy`

export const TAISANTHANHLY = '[TAISANTHANHLY]'
export const TAISANTHANHLY_LOADING = `${TAISANTHANHLY} is loading`
export const TAISANTHANHLY_DATA = `${TAISANTHANHLY} Set taisanthanhly data to store`
export const TAISANTHANHLY_FAILED = `${TAISANTHANHLY} Get taisanthanhly data failed`
export const TAISANTHANHLY_REMOVE = `${TAISANTHANHLY} Remove all taisanthanhly`

export const TAISANDANGSUDUNG = '[TAISANDANGSUDUNG]'
export const TAISANDANGSUDUNG_LOADING = `${TAISANDANGSUDUNG} is loading`
export const TAISANDANGSUDUNG_DATA = `${TAISANDANGSUDUNG} Set taisandangsudung data to store`
export const TAISANDANGSUDUNG_FAILED = `${TAISANDANGSUDUNG} Get taisandangsudung data failed`
export const TAISANDANGSUDUNG_REMOVE = `${TAISANDANGSUDUNG} Remove all taisandangsudung`

export const TAISANCHUASUDUNG = '[TAISANCHUASUDUNG]'
export const TAISANCHUASUDUNG_LOADING = `${TAISANCHUASUDUNG} is loading`
export const TAISANCHUASUDUNG_DATA = `${TAISANCHUASUDUNG} Set taisanchuasudung data to store`
export const TAISANCHUASUDUNG_FAILED = `${TAISANCHUASUDUNG} Get taisanchuasudung data failed`
export const TAISANCHUASUDUNG_REMOVE = `${TAISANCHUASUDUNG} Remove all taisanchuasudung`

export const TAISANSUACHUABAODUONG = '[TAISANSUACHUABAODUONG]'
export const TAISANSUACHUABAODUONG_LOADING = `${TAISANSUACHUABAODUONG} is loading`
export const TAISANSUACHUABAODUONG_DATA = `${TAISANSUACHUABAODUONG} Set taisansuachuabaoduong data to store`
export const TAISANSUACHUABAODUONG_FAILED = `${TAISANSUACHUABAODUONG} Get taisansuachuabaoduong data failed`
export const TAISANSUACHUABAODUONG_REMOVE = `${TAISANSUACHUABAODUONG} Remove all taisansuachuabaoduong`

export const KHAIBAOHONGMAT = '[KHAIBAOHONGMAT]'
export const KHAIBAOHONGMAT_LOADING = `${KHAIBAOHONGMAT} is loading`
export const KHAIBAOHONGMAT_DATA = `${KHAIBAOHONGMAT} Set khaibaohongmat data to store`
export const KHAIBAOHONGMAT_FAILED = `${KHAIBAOHONGMAT} Get khaibaohongmat data failed`
export const KHAIBAOHONGMAT_REMOVE = `${KHAIBAOHONGMAT} Remove all khaibaohongmat`
// toàn bộ tài sản
export const toanbotaisanLoading = () => ({
    type: TOANBOTAISAN_LOADING,
    payload: {},
})

export const toanbotaisanGetData = (data) => ({
    type: TOANBOTAISAN_DATA,
    payload: {
        data
    },
});

export const removeToanbotaisanData = () => ({
    type: TOANBOTAISAN_REMOVE,
    payload: {},
});

export const toanbotaisanFailed = () => ({
    type: TOANBOTAISAN_FAILED,
    payload: {},
})

// tài sản hỏng
export const taisanhongLoading = () => ({
    type: TAISANHONG_LOADING,
    payload: {},
})

export const taisanhongGetData = (data) => ({
    type: TAISANHONG_DATA,
    payload: {
        data
    },
})

export const removeTaisanhongData = () => ({
    type: TAISANHONG_REMOVE,
    payload: {},
})

export const taisanhongFailed = () => ({
    type: TAISANHONG_FAILED,
    payload: {},
})


// tài sản huy
export const taisanhuyLoading = () => ({
    type: TAISANHUY_LOADING,
    payload: {},
})

export const taisanhuyGetData = (data) => ({
    type: TAISANHUY_DATA,
    payload: {
        data
    },
})

export const removeTaisanhuyData = () => ({
    type: TAISANHUY_REMOVE,
    payload: {},
})

export const taisanhuyFailed = () => ({
    type: TAISANHUY_FAILED,
    payload: {},
})
// tài sản mất
export const taisanmatLoading = () => ({
    type: TAISANMAT_LOADING,
    payload: {},
})

export const taisanmatGetData = (data) => ({
    type: TAISANMAT_DATA,
    payload: {
        data
    },
})

export const removeTaisanmatData = () => ({
    type: TAISANMAT_REMOVE,
    payload: {},
})

export const taisanmatFailed = () => ({
    type: TAISANMAT_FAILED,
    payload: {},
})

// tài sản thanh lý
export const taisanthanhlyLoading = () => ({
    type: TAISANTHANHLY_LOADING,
    payload: {},
})

export const taisanthanhlyGetData = (data) => ({
    type: TAISANTHANHLY_DATA,
    payload: {
        data
    },
})

export const removeTaisanthanhlyData = () => ({
    type: TAISANTHANHLY_REMOVE,
    payload: {},
})

export const taisanthanhlyFailed = () => ({
    type: TAISANTHANHLY_FAILED,
    payload: {},
})

// tài sản đang sử dụng
export const taisandangsudungLoading = () => ({
    type: TAISANDANGSUDUNG_LOADING,
    payload: {},
})

export const taisandangsudungGetData = (data) => ({
    type: TAISANDANGSUDUNG_DATA,
    payload: {
        data
    },
})

export const removeTaisandangsudungData = () => ({
    type: TAISANDANGSUDUNG_REMOVE,
    payload: {},
})

export const taisandangsudungFailed = () => ({
    type: TAISANDANGSUDUNG_FAILED,
    payload: {},
})

// tài sản chưa sử dụng
export const taisanchuasudungLoading = () => ({
    type: TAISANCHUASUDUNG_LOADING,
    payload: {},
})

export const taisanchuasudungGetData = (data) => ({
    type: TAISANCHUASUDUNG_DATA,
    payload: {
        data
    },
})

export const removeTaisanchuasudungData = () => ({
    type: TAISANCHUASUDUNG_REMOVE,
    payload: {},
})

export const taisanchuasudungFailed = () => ({
    type: TAISANCHUASUDUNG_FAILED,
    payload: {},
})

// tài sản bảo dưỡng sửa chữa
export const taisanbaoduongsuachuaLoading = () => ({
    type: TAISANSUACHUABAODUONG_LOADING,
    payload: {},
})

export const taisanbaoduongsuachuaGetData = (data) => ({
    type: TAISANSUACHUABAODUONG_DATA,
    payload: {
        data
    },
})

export const removeTaisanbaoduongsuachuaData = () => ({
    type: TAISANSUACHUABAODUONG_REMOVE,
    payload: {},
})

export const taisanbaoduongsuachuaFailed = () => ({
    type: TAISANSUACHUABAODUONG_FAILED,
    payload: {},
})


// khaibaohongmat
export const khaibaohongmatLoading = () => ({
    type: KHAIBAOHONGMAT_LOADING,
    payload: {},
})

export const khaibaohongmatGetData = (data) => ({
    type: KHAIBAOHONGMAT_DATA,
    payload: {
        data
    },
})

export const removeKhaibaohongmatData = () => ({
    type: KHAIBAOHONGMAT_REMOVE,
    payload: {},
})

export const khaibaohongmatFailed = () => ({
    type: KHAIBAOHONGMAT_FAILED,
    payload: {},
})