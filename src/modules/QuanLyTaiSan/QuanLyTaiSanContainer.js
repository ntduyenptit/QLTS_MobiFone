import { Alert } from 'react-native';
import { compose, lifecycle } from 'recompose';

import QuanLyTaiSanScreen, { GetToanBoTaiSanData } from './QuanLyTaiSan';
import { getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis'
import { store } from '../../redux/store';
import { tabs } from '../../api/config';
import { headerRightComponent } from '../navigation/stackNavigationData'

import { getLTSDataAction, getMSDDataAction, getNCCDataAction } from '../../redux/actions/filter.actions';

const isLoadData = () => {
  switch (store.getState().currentTabReducer.tabName) {
    case tabs.toan_bo_tai_san: {
      return store.getState().toanbotaisanReducer.toanbotaisanData.length > 0;
    }
    case tabs.tai_san_mat: {
      return store.getState().taisanmatReducer.taisanmatData.length > 0;
    }
    case tabs.tai_san_hong: {
      return store.getState().taisanhongReducer.taisanhongData.length > 0;
    }
    case tabs.tai_san_huy: {
      return store.getState().taisanhuyReducer.taisanhuyData.length > 0;
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
    case tabs.bao_hong_mat_tai_san: {
      return store.getState().khaibaohongmatReducer.khaibaohongmatData.length > 0;
    }
    default:
      return false;
  }
}

export default compose(
  lifecycle({
    componentDidMount() {
      const setHeaderOptions=()=> { 
        this.props.navigation.dangerouslyGetParent().setOptions({headerRight: () => headerRightComponent()}); };
      this.props.navigation.addListener('focus', setHeaderOptions); 
      if (!isLoadData()) {
        GetToanBoTaiSanData();
      }
      if (store.getState().filterLTSDataReducer.ltsDataFilter.length === 0) {
        Promise.all([
          getLTSDataFilter(),
          getMSDDataFilter(),
          getNCCDataFilter(),
        ]).then(res => {
          if (res) {
            store.dispatch(getLTSDataAction(res[0].result));
            store.dispatch(getMSDDataAction(res[1].result));
            store.dispatch(getNCCDataAction(res[2].result));
          } else {
            Alert.alert('Filter failed!');
          }
        })
      }
    },
  }))(QuanLyTaiSanScreen);
