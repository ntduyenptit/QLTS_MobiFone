import { screens } from '@app/api/config';
import { store } from '@app/redux/store';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected; 

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
    };
};