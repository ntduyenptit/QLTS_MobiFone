import { store } from '@app/redux/store';

export default function getParameters() {
    const state = store.getState();


    const linhVucKinhDoanh = state.filterLVKDSelectedReducer.lvkdFilterSelected;

    return {
        linhVucKinhDoanh,
    };
};