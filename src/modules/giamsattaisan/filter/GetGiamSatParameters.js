import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const startdate = state.filterStartDateSelectedReducer.startdateFilterSelected;
    const enddate = state.filterEndDateSelectedReducer.enddateFilterSelected;
    const phanloaitaisan = state.filterPhanLoaiTaiSanSelectedReducer.pltsFilterSelected;
    const chieudichuyen = state.filterChieuDiChuyenSelectedReducer.chieuDiChuyenFilterSelected

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

    const phanLoaiTaiSan = find(phanloaitaisan, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(phanloaitaisan, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    const chieuDiChuyen = find(chieudichuyen, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(chieudichuyen, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
        startdate: StartDate,
        enddate: EndDate,
        chieudichuyen: chieuDiChuyen,
        phanloaitaisan: phanLoaiTaiSan
    };
};