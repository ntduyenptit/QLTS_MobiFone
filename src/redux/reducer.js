import { combineReducers } from 'redux';
import { USER_LOGOUT } from './actions/user.actions';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import userReducer from '../modules/auth/AuthState';
import { 
  toanbotaisanReducer,
  taisanhongReducer, 
  taisanhuyReducer, 
  taisanthanhlyReducer,
  taisanmatReducer,
  taisandangsudungReducer,
  taisanchuasudungReducer,
  taisansuachuabaoduongReducer,
  khaibaohongmatReducer
} from '../modules/quanlytaisan/QuanLyTaiSanState';
import { 
  filterReducer,
  moreReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,
  filterTinhThanhDataReducer,

  filterDVQLSelectedReducer,
  filterLTSSelectedReducer,
  filterMSDSelectedReducer,
  filterTTSelectedReducer,
  filterNCCSelectedReducer,
  filterTTSDSelectedReducer,
  filterHTSelectedReducer,
  filterKBSelectedReducer,
  filterStartDateSelectedReducer,
  filterEndDateSelectedReducer,
  filterChieuDiChuyenSelectedReducer,
  filterPhanLoaiTaiSanSelectedReducer,
  filterTTKKSelectedReducer,
  filterTinhThanhSelectedReducer,
  filterQuanHuyenSelectedReducer,

  currentScreenReducer,
  currentTabReducer,
  SearchReducer
 } from '../modules/global/GlobalState';

 const appReducer = combineReducers({
  // ## Generator Reducers
  app,
  userReducer,
// filter get
  filterReducer,
  moreReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,
  filterTinhThanhDataReducer,

  // filter selected
  filterDVQLSelectedReducer,
  filterLTSSelectedReducer,
  filterMSDSelectedReducer,
  filterTTSelectedReducer,
  filterNCCSelectedReducer,
  filterTTSDSelectedReducer,
  filterHTSelectedReducer,
  filterKBSelectedReducer,
  filterStartDateSelectedReducer,
  filterEndDateSelectedReducer,
  filterChieuDiChuyenSelectedReducer,
  filterPhanLoaiTaiSanSelectedReducer,
  filterTTKKSelectedReducer,
  filterTinhThanhSelectedReducer,
  filterQuanHuyenSelectedReducer,


  currentScreenReducer,
  currentTabReducer,

  SearchReducer,

  // giám sát tài sản
  toanbotaisanReducer,
  taisanhongReducer,
  taisanhuyReducer,
  taisanthanhlyReducer,
  taisanmatReducer,
  taisandangsudungReducer,
  taisanchuasudungReducer,
  taisansuachuabaoduongReducer,
  khaibaohongmatReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  
  return appReducer(state, action);
};

export default rootReducer;
