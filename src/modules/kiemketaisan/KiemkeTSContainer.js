import { Alert } from 'react-native';
import { compose, lifecycle } from 'recompose';
import { getDVQLDataFilter, getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis'
import KiemkeTsScreen, { GetData } from './KiemkeTS';
import { store } from '../../redux/store';


export default compose(
    lifecycle({
        componentDidMount() {
            Promise.all([getDVQLDataFilter(), getLTSDataFilter(), getMSDDataFilter(), getNCCDataFilter()]).then(res => {
                if (res) {
                    GetData(res[0].result);
                    store.dispatch(getDVQLDataAction(res[0].result));
                    store.dispatch(getLTSDataAction(res[1].result));
                    store.dispatch(getMSDDataAction(res[2].result));
                    store.dispatch(getNCCDataAction(res[3].result));
                } else {
                    Alert.alert('Filter failed!');
                }
            })
                .catch(err => console.log('err: ', err));
        },
    }))(KiemkeTsScreen);
