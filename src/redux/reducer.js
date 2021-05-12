import { combineReducers } from 'redux';
import { USER_LOGOUT } from './actions/user.actions';

// ## Generator Reducer Imports
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import userReducer from '../modules/auth/AuthState';
import { 
  toanbotaisanReducer,
  taisanhongReducer, 
  taisanthanhlyReducer,
  taisanmatReducer,
  taisandangsudungReducer,
  taisanchuasudungReducer,
  taisansuachuabaoduongReducer
} from '../modules/quanlytaisan/QuanLyTaiSanState';
import { 
  filterReducer, 
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,

  filterDVQLSelectedReducer,
  filterLTSSelectedReducer,
  filterMSDSelectedReducer,
  filterTTSelectedReducer,
  filterNCCSelectedReducer,
  filterTTSDSelectedReducer,
  filterHTSelectedReducer,

  currentScreenReducer,
  currentTabReducer
 } from '../modules/global/GlobalState';

 const appReducer = combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  userReducer,
// filter get
  filterReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,

  // filter selected
  filterDVQLSelectedReducer,
  filterLTSSelectedReducer,
  filterMSDSelectedReducer,
  filterTTSelectedReducer,
  filterNCCSelectedReducer,
  filterTTSDSelectedReducer,
  filterHTSelectedReducer,

  currentScreenReducer,
  currentTabReducer,

  // giám sát tài sản
  toanbotaisanReducer,
  taisanhongReducer,
  taisanthanhlyReducer,
  taisanmatReducer,
  taisandangsudungReducer,
  taisanchuasudungReducer,
  taisansuachuabaoduongReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  
  return appReducer(state, action);
};

export default rootReducer;
