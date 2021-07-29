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
    const MsdFilterSelected = state.filterMSDSelectedReducer.msdFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung).data;
    const loaiTaiSan = find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung)
        && find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung).data;
    const nhaCungCap = find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung)
        && find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung).data;
    const maSuDung = find(MsdFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung)
        && find(MsdFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_dang_su_dung).data;


    return {
        datas: donViQuanLy || DvqlDataFilter,
        loaitaisan: loaiTaiSan,
        nhacungcap: nhaCungCap,
        masudung: maSuDung
    };
}