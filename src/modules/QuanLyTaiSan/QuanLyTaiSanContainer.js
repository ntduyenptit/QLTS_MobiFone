/* eslint-disable import/no-cycle */
import { Alert } from 'react-native';
import { compose, lifecycle } from 'recompose';

import QuanLyTaiSanScreen from './QuanLyTaiSan';
import { getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis';
import { store } from '../../redux/store';
import { headerRightComponent } from '../navigation/stackNavigationData'

import { getLTSDataAction, getMSDDataAction, getNCCDataAction } from '../../redux/actions/filter.actions';

export default compose(
  lifecycle({
    componentDidMount() {
      const setHeaderOptions=()=> { 
        this.props.navigation.dangerouslyGetParent().setOptions({headerRight: () => headerRightComponent()}); };
      this.props.navigation.addListener('focus', setHeaderOptions);
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
