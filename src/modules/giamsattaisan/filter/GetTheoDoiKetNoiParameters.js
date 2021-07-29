import { store } from '@app/redux/store';
import { screens } from '@app/api/config';
import find from 'lodash/find';

export default function getParameters() {
    const state = store.getState();

    const DvqlDataFilter = state.filterDVQLDataReducer.dvqlDataFilter;
    const startdate = state.filterStartDateSelectedReducer.startdateFilterSelected;
    const enddate = state.filterEndDateSelectedReducer.enddateFilterSelected;

    const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi)
    && find(startdate, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi).data;
    const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi)
    && find(enddate, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi).data;


    return {
        datas: DvqlDataFilter,
        startdate: StartDate,
        enddate: EndDate,
    };
};