import { Alert } from 'react-native';
import { compose, lifecycle } from 'recompose';

import QuanLyTaiSanScreen, { GetToanBoTaiSanData } from './QuanLyTaiSan';
import { getDVQLDataFilter, getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis'
import { store } from '../../redux/store';
import { tabs } from '../../api/config'

import { getDVQLDataAction, getLTSDataAction, getMSDDataAction, getNCCDataAction } from '../../redux/actions/filter.actions';

const isLoadData = () => {
  switch(store.getState().currentTabReducer.tabName) {
    case tabs.toan_bo_tai_san: {
      return store.getState().toanbotaisanReducer.toanbotaisanData.length > 0;
    }
    case tabs.tai_san_mat: {
      return store.getState().taisanmatReducer.taisanmatData.length > 0;
    }
    case tabs.tai_san_hong: {
      return store.getState().taisanhongReducer.taisanhongData.length > 0;
    }
    case tabs.tai_san_thanh_ly: {
      return store.getState().taisanthanhlyReducer.taisanthanhlyData.length > 0;
    }
    case tabs.tai_san_dang_su_dung: {
      return store.getState().taisandangsudungReducer.taisandangsudungData.length > 0;
    }
    case tabs.tai_san_chua_su_dung: {
      return store.getState().taisanchuasudungReducer.taisanchuasudungData.length > 0;
    }
    case tabs.tai_san_sua_chua_bao_duong: {
      return store.getState().taisansuachuabaoduongReducer.taisansuachuabaoduongData.length > 0;
    }
    default:
      return false;
  }
}

export default compose(
  lifecycle({
    componentDidMount() {
      if (store.getState().filterDVQLDataReducer.dvqlDataFilter.length === 0) {
        Promise.all([
          getDVQLDataFilter(),
          getLTSDataFilter(),
          getMSDDataFilter(),
          getNCCDataFilter(),
        ]).then(res => {
          if (res) {
            GetToanBoTaiSanData({ datas: res[0].result });
            store.dispatch(getDVQLDataAction(res[0].result));
            store.dispatch(getLTSDataAction(res[1].result));
            store.dispatch(getMSDDataAction(res[2].result));
            store.dispatch(getNCCDataAction(res[3].result));
          } else {
            Alert.alert('Filter failed!');
          }
        })
          .catch(err => console.log('err: ', err));
      } else if (!isLoadData()) {
          GetToanBoTaiSanData({});
        }
    },
  }))(QuanLyTaiSanScreen);
