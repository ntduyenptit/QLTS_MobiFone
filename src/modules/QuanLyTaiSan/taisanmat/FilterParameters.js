/* eslint-disable import/no-unresolved */
import { tabs } from "@app/api/config";
import { store } from '@app/redux/store';
import find from 'lodash/find';

export default function getParameter() {
    const state = store.getState();
    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const LtsFilterSelected = state.filterLTSSelectedReducer.ltsFilterSelected;
    const NccFilterSelected = state.filterNCCSelectedReducer.nccFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat).data;
    const loaiTaiSan = find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat)
        && find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat).data;
    const nhaCungCap = find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat)
        && find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_mat).data;


    return {
        datas: donViQuanLy || DvqlDataFilter,
        loaitaisan: loaiTaiSan,
        nhacungcap: nhaCungCap,
    };
}