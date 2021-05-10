import { Alert } from 'react-native';
import { compose, lifecycle } from 'recompose';
import { getDVQLDataFilter, getLTSDataFilter, getMSDDataFilter, getNCCDataFilter } from '../global/FilterApis'
import KiemkeTsScreen, { GetData } from './KiemkeTS';
import { store } from '../../redux/store';


export default compose(
    lifecycle({
        componentDidMount() {
            console.log('ppppp');
            GetData(store.getState().filterDVQLReducer.getDVQLDataFilter);
        },
    }))(KiemkeTsScreen);
