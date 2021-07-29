/* eslint-disable import/no-unresolved */
import { tabs } from "@app/api/config";
import { store } from '@app/redux/store';
import find from 'lodash/find';

export default function getParameter() {
    const state = store.getState();
    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;
    const LtsFilterSelected = state.filterLTSSelectedReducer.ltsFilterSelected;
    const MsdFilterSelected = state.filterMSDSelectedReducer.msdFilterSelected;
    const NccFilterSelected = state.filterNCCSelectedReducer.nccFilterSelected;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san).data;
    const loaiTaiSan = find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san)
        && find(LtsFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san).data;
    const nhaCungCap = find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san)
        && find(NccFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san).data;
    const maSuDung = find(MsdFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san)
        && find(MsdFilterSelected, itemSelected => itemSelected.tab === tabs.toan_bo_tai_san).data;

        return {
            datas: donViQuanLy || DvqlDataFilter,
            loaitaisan: loaiTaiSan,
            nhacungcap: nhaCungCap,
            masudung: maSuDung,
        };
}