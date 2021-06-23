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
    const TtFilterSelected = state.filterTTSelectedReducer.ttFilterSelected;
    const NccFilterSelected = state.filterNCCSelectedReducer.nccFilterSelected;
    const HtFilterSelected = state.filterHTSelectedReducer.htFilterSelected;
    const KbFilterSelected = state.filterKBSelectedReducer.kbFilterSelected;
    const tab = state.currentTabReducer.tabName;

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(DvqlFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const loaiTaiSan = find(LtsFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(LtsFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const nhaCungCap = find(NccFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(NccFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const maSuDung = find(MsdFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(MsdFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const hinhthuc = find(HtFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(HtFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const trangThai = find(TtFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(TtFilterSelected, itemSelected => itemSelected.tab === tab).data;
    const khaiBao = find(KbFilterSelected, itemSelected => itemSelected.tab === tab)
        && find(KbFilterSelected, itemSelected => itemSelected.tab === tab).data;

    switch (tab) {
        case tabs.toan_bo_tai_san:
        case tabs.tai_san_chua_su_dung:
        case tabs.tai_san_dang_su_dung: {
            return {
                datas: donViQuanLy || DvqlDataFilter,
                loaitaisan: loaiTaiSan,
                nhacungcap: nhaCungCap,
                masungdung: maSuDung,
            };
        }
        case tabs.tai_san_mat:
        case tabs.tai_san_hong:
        case tabs.tai_san_huy:
        case tabs.tai_san_thanh_ly: {
            return {
                datas: donViQuanLy || DvqlDataFilter,
                loaitaisan: loaiTaiSan,
                nhacungcap: nhaCungCap,
            };
        }
        case tabs.tai_san_sua_chua_bao_duong: {
            return {
                datas: donViQuanLy || DvqlDataFilter,
                loaitaisan: loaiTaiSan,
                nhacungcap: nhaCungCap,
                hinhthuc,
                trangthai: trangThai,
            };
        }
        case tabs.bao_hong_mat_tai_san: {
            return {
                datas: donViQuanLy || DvqlDataFilter,
                khaibao: khaiBao,
            };
        }
        default: {
            return null;
        }
    };
}