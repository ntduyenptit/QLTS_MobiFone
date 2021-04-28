export const FILTER = '[FILTER]';
export const SHOW_FILTER = `${FILTER} Show filter modal`;
export const HIDE_FILTER = `${FILTER} Hide filter modal`;
// get
export const DVQL_FILTER = `${FILTER} Get DON_VI_QUAN_LY data`;
export const LTS_FILTER = `${FILTER} Get LOAI_TAI_SAN data`;
export const NCC_FILTER = `${FILTER} Get NHA_CUNG_CAP data`;
export const MSD_FILTER = `${FILTER} Get MA_SU_DUNG data`;

export const showFilter = () => ({
    type: SHOW_FILTER,
    payload: {},
});

export const hideFilter = () => ({
    type: HIDE_FILTER,
    payload: {},
});

export const getDVQLDataAction = (data) => ({
    type: DVQL_FILTER,
    payload: data
});

export const getLTSDataAction = (data) => ({
    type: LTS_FILTER,
    payload: data
});

export const getNCCDataAction = (data) => ({
    type: NCC_FILTER,
    payload: data
});

export const getMSDDataAction = (data) => ({
    type: MSD_FILTER,
    payload: data
});