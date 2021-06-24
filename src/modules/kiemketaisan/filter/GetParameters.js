import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const startdate = state.filterStartDateSelectedReducer.startdateFilterSelected;
    const enddate = state.filterEndDateSelectedReducer.enddateFilterSelected;
    const tinhtrangkiemke = state.filterTTKKSelectedReducer.ttkkFilterSelected;

    

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
    const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
    && find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
    const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
    && find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;

    const tinhTrangKiemKe = find(tinhtrangkiemke, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
    && find(tinhtrangkiemke, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
        startdate: StartDate,
        enddate: EndDate,
        tinhtrangkiemke: tinhTrangKiemKe
    };
};