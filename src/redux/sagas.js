import { all, takeLatest } from 'redux-saga/effects';
import { REFRESH } from './actions/quanlytaisan.actions';

import refreshQLTSData from './authSaga/refreshDataSaga';

export default function* rootSaga() {
    yield all([
        takeLatest(REFRESH, refreshQLTSData),
    ]);
}