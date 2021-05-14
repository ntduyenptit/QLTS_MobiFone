export const FILTER = '[FILTER]';
export const SHOW_FILTER = `${FILTER} Show filter modal`;
export const HIDE_FILTER = `${FILTER} Hide filter modal`;
// get
export const DVQL_FILTER = `${FILTER} Get DON_VI_QUAN_LY data`;
export const LTS_FILTER = `${FILTER} Get LOAI_TAI_SAN data`;
export const NCC_FILTER = `${FILTER} Get NHA_CUNG_CAP data`;
export const MSD_FILTER = `${FILTER} Get MA_SU_DUNG data`;
export const TT_FILTER = `${FILTER} Get TRANG_THAI data`;
export const TTSD_FILTER = `${FILTER} Get TRANG_THAI_SU_DUNG data`;

// selected
export const DVQL_SELECTED_ADD = `${FILTER} Add DON_VI_QUAN_LY selected`;
export const DVQL_SELECTED_REMOVE = `${FILTER} Remove DON_VI_QUAN_LY selected`;

export const LTS_SELECTED_ADD = `${FILTER} Add LOAI_TAI_SAN selected`;
export const LTS_SELECTED_REMOVE = `${FILTER} Remove LOAI_TAI_SAN selected`;

export const NCC_SELECTED_ADD = `${FILTER} Add NHA_CUNG_CAP selected`;
export const NCC_SELECTED_REMOVE = `${FILTER} Remove NHA_CUNG_CAP selected`;

export const MSD_SELECTED_ADD = `${FILTER} Add MA_SU_DUNG selected`;
export const MSD_SELECTED_REMOVE = `${FILTER} Remove MA_SU_DUNG selected`;

export const TT_SELECTED_ADD = `${FILTER} Add TRANG_THAI selected`;
export const TT_SELECTED_REMOVE = `${FILTER} Remove TRANG_THAI selected`;

export const TTSD_SELECTED_ADD = `${FILTER} Add TRANG_THAI_SU_DUNG selected`;
export const TTSD_SELECTED_REMOVE = `${FILTER} Remove TRANG_THAI_SU_DUNG selected`;

export const HT_SELECTED_ADD = `${FILTER} Add HINH_THUC selected`;
export const HT_SELECTED_REMOVE = `${FILTER} Remove HINH_THUC selected`;

export const STARTDATE_SELECTED_ADD = `${FILTER} Add START_DATE selected`;
export const STARTDATE_SELECTED_REMOVE = `${FILTER} Remove START_DATE selected`;
export const ENDDATE_SELECTED_ADD = `${FILTER} Add END_DATE selected`;
export const ENDDATE_SELECTED_REMOVE = `${FILTER} Remove END_DATE selected`;

export const showFilter = () => ({
    type: SHOW_FILTER,
    payload: {},
});

export const hideFilter = () => ({
    type: HIDE_FILTER,
    payload: {},
});

// đơn vị quản lý
export const getDVQLDataAction = (data) => ({
    type: DVQL_FILTER,
    payload: data
});

export const addSelectedDVQLAction = (data) => ({
    type: DVQL_SELECTED_ADD,
    payload: data
});

export const removeSelectedDVQLAction = (data) => ({
    type: DVQL_SELECTED_REMOVE,
    payload: data
});

// loại tài sản
export const getLTSDataAction = (data) => ({
    type: LTS_FILTER,
    payload: data
});

export const addSelectedLTSAction = (data) => ({
    type: LTS_SELECTED_ADD,
    payload: data
});

export const removeSelectedLTSAction = (data) => ({
    type: LTS_SELECTED_REMOVE,
    payload: data
});

// nhà cung cấp
export const getNCCDataAction = (data) => ({
    type: NCC_FILTER,
    payload: data
});

export const addSelectedNCCAction = (data) => ({
    type: NCC_SELECTED_ADD,
    payload: data
});

export const removeSelectedNCCAction = (data) => ({
    type: NCC_SELECTED_REMOVE,
    payload: data
});

// mã sử dụng
export const getMSDDataAction = (data) => ({
    type: MSD_FILTER,
    payload: data
});

export const addSelectedMSDAction = (data) => ({
    type: MSD_SELECTED_ADD,
    payload: data
});

export const removeSelectedMSDAction = (data) => ({
    type: MSD_SELECTED_REMOVE,
    payload: data
});

// tình trạng
export const getTTDataAction = (data) => ({
    type: TT_FILTER,
    payload: data
});

export const addSelectedTTAction = (data) => ({
    type: TT_SELECTED_ADD,
    payload: data
});

export const removeSelectedTTAction = (data) => ({
    type: TT_SELECTED_REMOVE,
    payload: data
});

// trạng thái sử dụng
export const getTTSDDataAction = (data) => ({
    type: TTSD_FILTER,
    payload: data
});

export const addSelectedTTSDAction = (data) => ({
    type: TTSD_SELECTED_ADD,
    payload: data
});

export const removeSelectedTTSDAction = (data) => ({
    type: TTSD_SELECTED_REMOVE,
    payload: data
});

// hình thức
export const addSelectedHTAction = (data) => ({
    type: HT_SELECTED_ADD,
    payload: data
});

export const removeSelectedHTAction = (data) => ({
    type: HT_SELECTED_REMOVE,
    payload: data
});

// thời gian
export const addSelectedStartDateAction = (data) => ({
    type: STARTDATE_SELECTED_ADD,
    payload: data
});

export const removeSelectedStartDateAction = (data) => ({
    type: STARTDATE_SELECTED_REMOVE,
    payload: data
});

export const addSelectedEndDateAction = (data) => ({
    type: ENDDATE_SELECTED_ADD,
    payload: data
});

export const removeSelectedEndDateAction = (data) => ({
    type: ENDDATE_SELECTED_REMOVE,
    payload: data
});
