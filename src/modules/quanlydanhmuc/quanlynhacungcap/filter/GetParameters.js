import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters(screen) {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const DvqlFilterSelected = state.filterDVQLSelectedReducer.dvqlFilterSelected;


    const tinhtrangsudung = state.filterTTSDSelectedReducer.ttsdFilterSelected;

    

    const donViQuanLy = find(DvqlFilterSelected, itemSelected => itemSelected.screen === screen)
    && find(DvqlFilterSelected, itemSelected => itemSelected.screen === screen).data;

    const tinhTrangSuDung = find(tinhtrangsudung, itemSelected => itemSelected.screen === screen)
    && find(tinhtrangsudung, itemSelected => itemSelected.screen === screen).data;

    return {
        datas: donViQuanLy || DvqlDataFilter,
        tinhtrangsudung: tinhTrangSuDung && tinhTrangSuDung[0]
    };
};