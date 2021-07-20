import {call, put} from 'redux-saga/effects';
import { store } from '@app/redux/store';
import { tabs } from '@app/api/config';
import {
    taisanhongGetData,
    taisanhuyGetData,
    taisanmatGetData,
    taisanthanhlyGetData,
    toanbotaisanGetData,
    taisandangsudungGetData,
    taisanchuasudungGetData,
    taisanbaoduongsuachuaGetData,
    khaibaohongmatGetData,
  } from '../../redux/actions/quanlytaisan.actions';

  let count = 0;

function addData(tab, res) {
    switch (tab) {
        case tabs.toan_bo_tai_san:
          store.dispatch(toanbotaisanGetData(res));
          break;
        case tabs.tai_san_thanh_ly:
          store.dispatch(taisanthanhlyGetData(res));
          break;
        case tabs.tai_san_mat:
          store.dispatch(taisanmatGetData(res));
          break;
        case tabs.tai_san_hong:
          store.dispatch(taisanhongGetData(res));
          break;
        case tabs.tai_san_huy:
          store.dispatch(taisanhuyGetData(res));
          break;
        case tabs.tai_san_dang_su_dung:
          store.dispatch(taisandangsudungGetData(res));
          break;
        case tabs.tai_san_chua_su_dung:
          store.dispatch(taisanchuasudungGetData(res));
          break;
        case tabs.tai_san_sua_chua_bao_duong:
          store.dispatch(taisanbaoduongsuachuaGetData(res));
          break;
        case tabs.bao_hong_mat_tai_san:
          store.dispatch(khaibaohongmatGetData(res));
          break;
        default:
          break;
      }
  }

  export default function* addQLTSData(data) {
    try {
      console.log('hahahaha 123', count);
      count += 1;
      const params = data?.params;
      yield call(addData(params?.tab, params?.res));
    } catch (error) {
        console.log(error);
    }
}