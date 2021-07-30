import {createRef} from 'react';
import { store } from '../../redux/store';
import { setCurrentTab, setCurrentScreen } from '../../redux/actions/screen.actions';

export const navigationRef = createRef();

export function navigate({name, params, type = 'screen'}) {
    if (type === 'tab') {
        store.dispatch(setCurrentTab(name));
    } else {
        store.dispatch(setCurrentScreen(name));
    }
    return navigationRef.current?.navigate(name, params);
  }
  
  export function goBack() {
   return navigationRef.current?.goBack();
  }