import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();
    const tinhThanh = state.filterTinhThanhSelectedReducer.tinhthanhFilterSelected;
    const quanHuyen = state.filterQuanHuyenSelectedReducer.quanhuyenFilterSelected;

    const tinhThanhSelected = find(tinhThanh, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly)
    && find(tinhThanh, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly).data;

    const quanHuyenSelected = find(quanHuyen, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly)
    && find(quanHuyen, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly).data;

    return {
        tinhThanh: tinhThanhSelected && tinhThanhSelected[0],
        quanHuyen: quanHuyenSelected && quanHuyenSelected[0]
    };
};