import { combineReducers } from 'redux';

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
  toanbodauTSRaVaoReducer,  
} from '../modules/giamsattaisan/theodoitaisan/GiamsatTsState';
import { 
  toanboTBReducer,  
} from '../modules/giamsattaisan/theodoiketnoi/TheodoiKetnoiState';
import { 
  toanbokiemkeReducer,  
} from '../modules/kiemketaisan/KiemkeTSState';

import { 
  filterReducer, 
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,
  currentScreenReducer,
  currentTabReducer
 } from '../modules/global/GlobalState';

export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  userReducer,
// filter
  filterReducer,
  filterDVQLDataReducer,
  filterLTSDataReducer,
  filterMSDDataReducer,
  filterNCCDataReducer,
  filterTTSDDataReducer,

  currentScreenReducer,
  currentTabReducer,
  toanbotaisanReducer,
  taisanhongReducer,
  taisanthanhlyReducer,
  taisanmatReducer,
  taisandangsudungReducer,
  taisanchuasudungReducer,
  taisansuachuabaoduongReducer,
  toanbodauTSRaVaoReducer,
  toanboTBReducer,
  toanbokiemkeReducer,
});
