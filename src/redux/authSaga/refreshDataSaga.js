import {call, take, put} from 'redux-saga/effects';
import { tabs } from '@app/api/config';
import { store } from '@app/redux/store';
import {
  removeToanbotaisanData,
  removeTaisanhongData,
  removeTaisanhuyData,
  removeTaisanmatData,
  removeTaisanthanhlyData,
  removeTaisandangsudungData,
  removeTaisanchuasudungData,
  removeTaisanbaoduongsuachuaData,
  removeKhaibaohongmatData,
} from '@app/redux/actions/quanlytaisan.actions';

function resetData(tab) {
    switch (tab) {
      case tabs.toan_bo_tai_san:
        store.dispatch(removeToanbotaisanData());
        break;
      case tabs.tai_san_thanh_ly:
        store.dispatch(removeTaisanthanhlyData());
        break;
      case tabs.tai_san_mat:
        store.dispatch(removeTaisanmatData());
        break;
      case tabs.tai_san_hong:
        store.dispatch(removeTaisanhongData());
        break;
      case tabs.tai_san_huy:
        store.dispatch(removeTaisanhuyData());
        break;
      case tabs.tai_san_dang_su_dung:
        store.dispatch(removeTaisandangsudungData());
        break;
      case tabs.tai_san_chua_su_dung:
        store.dispatch(removeTaisanchuasudungData());
        break;
      case tabs.tai_san_sua_chua_bao_duong:
        store.dispatch(removeTaisanbaoduongsuachuaData());
        break;
      case tabs.bao_hong_mat_tai_san:
        store.dispatch(removeKhaibaohongmatData());
        break;
      default:
        break;
    }
  }


export default function* refreshQLTSData(data) {
    try {
      const params = data?.params;
       yield call(resetData(params?.tab));
       yield put(params?.action());
    } catch (error) {
        console.log(error);
    }
}