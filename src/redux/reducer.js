import { combineReducers } from 'redux';
import { USER_LOGOUT } from './actions/user.actions';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import userReducer from '../modules/auth/AuthState';
import loadingReducer from '../modules/quanlytaisan/QuanLyTaiSanState';
import { 
  filterReducer,
  moreReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterLVKDDataReducer,
  filterTTSDDataReducer,
  filterTinhThanhDataReducer,
  filterWhoSendNotiSelectedReducer,
  filterActionSelectedReducer,

  filterDVQLSelectedReducer,
  filterLTSSelectedReducer,
  filterMSDSelectedReducer,
  filterTTSelectedReducer,
  filterNCCSelectedReducer,
  filterLVKDSelectedReducer,
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
  filterLVKDDataReducer,
  filterActionSelectedReducer,

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
  filterLVKDSelectedReducer,
  filterWhoSendNotiSelectedReducer,


  currentScreenReducer,
  currentTabReducer,

  SearchReducer,

  // giám sát tài sản
  loadingReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  
  return appReducer(state, action);
};

export default rootReducer;
