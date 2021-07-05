import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
    };
};