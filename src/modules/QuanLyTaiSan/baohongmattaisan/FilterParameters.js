/* eslint-disable import/no-unresolved */
import { tabs } from "@app/api/config";
import { store } from '@app/redux/store';
import find from 'lodash/find';

export default function getParameter() {
    const state = store.getState();
    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const KbFilterSelected = state.filterKBSelectedReducer.kbFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.bao_hong_mat_tai_san)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.bao_hong_mat_tai_san).data;
        const khaiBao = find(KbFilterSelected, itemSelected => itemSelected.tab === tabs.bao_hong_mat_tai_san)
        && find(KbFilterSelected, itemSelected => itemSelected.tab === tabs.bao_hong_mat_tai_san).data;


    return {
        datas: donViQuanLy || DvqlDataFilter,
        khaibao: khaiBao,
    };
}