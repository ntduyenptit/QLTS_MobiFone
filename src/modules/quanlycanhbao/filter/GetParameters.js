import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const startdate = state.filterStartDateSelectedReducer.startdateFilterSelected;
    const enddate = state.filterEndDateSelectedReducer.enddateFilterSelected;
    const NguoiGuiThongBao = state.filterWhoSendNotiSelectedReducer.ngtbFilterSelected;
    const actionSelected = state.filterActionSelectedReducer.actionFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
    const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
    && find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
    const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
    && find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
    const HoatDong = find(actionSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
    && find(actionSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
        startdate: StartDate,
        enddate: EndDate,
        nguoiguithongbao: NguoiGuiThongBao,
        hoatdong: HoatDong,
    };
};