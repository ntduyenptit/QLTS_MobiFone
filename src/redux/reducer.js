import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import userReducer from '../modules/auth/AuthState';
import { 
  filterReducer, 
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  currentScreenReducer } from '../modules/global/GlobalState';

export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  userReducer,
  filterReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  currentScreenReducer
});
