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
    const HtFilterSelected = state.filterHTSelectedReducer.htFilterSelected;
    const TtFilterSelected = state.filterTTSelectedReducer.ttFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong).data;
    const loaiTaiSan = find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong)
        && find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong).data;
    const nhaCungCap = find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong)
        && find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong).data;
        const hinhthuc = find(HtFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong)
        && find(HtFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong).data;
    const trangThai = find(TtFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong)
        && find(TtFilterSelected, itemSelected => itemSelected.tab === tabs.tai_san_sua_chua_bao_duong).data;


    return {
        datas: donViQuanLy || DvqlDataFilter,
        loaitaisan: loaiTaiSan,
        nhacungcap: nhaCungCap,
        hinhthuc,
        trangthai: trangThai,
    };
}