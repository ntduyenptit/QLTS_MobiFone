import { Alert} from 'react-native';
import { compose, lifecycle } from 'recompose';

import QuanLyTaiSanScreen from './QuanLyTaiSan';
import { getDVQLDataFilter, getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis'
import { store } from '../../redux/store';
import { buildTree } from '../global/Helper';
import { getDVQLDataAction, getLTSDataAction, getMSDDataAction, getNCCDataAction } from '../../redux/actions/filter.actions';

export default compose(lifecycle({
  componentDidMount() {
    Promise.all([getDVQLDataFilter(), getLTSDataFilter(), getMSDDataFilter(), getNCCDataFilter()]).then(res => {
      if (res) {
        const DVQLData = buildTree(res[0].result);
        store.dispatch(getDVQLDataAction(DVQLData));
        store.dispatch(getLTSDataAction(res[1].result));
        store.dispatch(getMSDDataAction(res[2].result));
        store.dispatch(getNCCDataAction(res[3].result));
      } else {
        Alert.alert('Filter failed!');
      }
    })
    .catch(err => console.log(err));
  },
}),)(QuanLyTaiSanScreen);
