import { 
  SHOW_FILTER, 
  HIDE_FILTER, 
  DVQL_FILTER, 
  LTS_FILTER, 
  NCC_FILTER, 
  MSD_FILTER, 
  TT_FILTER,
  TTSD_FILTER,

  DVQL_SELECTED_ADD,
  TT_SELECTED_ADD,
  LTS_SELECTED_ADD,
  NCC_SELECTED_ADD,
  MSD_SELECTED_ADD,
  TTSD_SELECTED_ADD,
  HT_SELECTED_ADD,

  DVQL_SELECTED_REMOVE,
  TT_SELECTED_REMOVE,
  LTS_SELECTED_REMOVE,
  NCC_SELECTED_REMOVE,
  MSD_SELECTED_REMOVE,
  TTSD_SELECTED_REMOVE,
  HT_SELECTED_REMOVE
 } from '../../redux/actions/filter.actions'
import { screens, tabs } from '../../api/config';
import { CURRENT_SCREEN, CURRENT_TAB } from '../../redux/actions/screen.actions';

const initialState = {
    isShowFilter: false,
    screenName: screens.quan_ly_tai_san,
    tabName: tabs.toan_bo_tai_san,
    dvqlDataFilter: [],
    ltsDataFilter: [],
    nccDataFilter: [],
    msdDataFilter: [],
    ttDataFilter: [],
    ttsdDataFilter: [],

    dvqlFilterSelected: [],
    ltsFilterSelected: [],
    nccFilterSelected: [],
    msdFilterSelected: [],
    ttFilterSelected: [],
    ttsdFilterSelected: [],
}

// Reducer

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FILTER: {
      return {
        isShowFilter: true,
      }
    }
    case HIDE_FILTER: {
      return {
        isShowFilter: false
      }
    }
    default: {
      return state
    }
  }
}

export const currentScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SCREEN: {
      return {
        screenName: action.payload.screen
      }
    }
    default: {
      return state
    }
  }
}

export const currentTabReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TAB: {
      return {
        tabName: action.payload.tab
      }
    }
    default: {
      return state
    }
  }
}

// get
export const filterDVQLDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVQL_FILTER: {
      return {
        dvqlDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterTTDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TT_FILTER: {
      return {
        ttDataFiler: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterLTSDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LTS_FILTER: {
      return {
        ltsDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterNCCDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NCC_FILTER: {
      return {
        nccDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterMSDDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSD_FILTER: {
      return {
        msdDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterTTSDDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TTSD_FILTER: {
      return {
        ttsdDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

// selected
export const filterDVQLSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVQL_SELECTED_ADD: {
      return {
        ...state,
        dvqlFilterSelected: [...state.dvqlFilterSelected, action.payload],
      }
    }
    case DVQL_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          dvqlFilterSelected: state.dvqlFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          dvqlFilterSelected: state.dvqlFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTTSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TT_SELECTED_ADD: {
      return {
        ...state,
        ttFilerSelected: [...state.ttFilerSelected, action.payload],
      }
    }
    case TT_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          ttFilerSelected: state.ttFilerSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          ttFilerSelected: state.ttFilerSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterLTSSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LTS_SELECTED_ADD: {
      return {
        ...state,
        ltsFilterSelected: [...state.ltsFilterSelected, action.payload]
      }
    }
    case LTS_SELECTED_REMOVE: {
      if (state.ltsFilterSelected !== []) {
        if (action.payload.screen === screens.quan_ly_tai_san) {
          return {
            ...state,
            ltsFilterSelected: state.ltsFilterSelected.filter((item) => item.tab !== action.payload.tab)
          }
        } 
          return {
            ...state,
            ltsFilterSelected: state.ltsFilterSelected.filter((item) => item.screen !== action.payload.screen)
          }
      }
      return state;
    }
    default: {
      return state
    }
  }
}

export const filterNCCSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case NCC_SELECTED_ADD: {
      return {
        ...state,
        nccFilterSelected: [...state.nccFilterSelected, action.payload]
      }
    }
    case NCC_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          nccFilterSelected: state.nccFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          nccFilterSelected: state.nccFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterMSDSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSD_SELECTED_ADD: {
      return {
        ...state,
        msdFilterSelected: [...state.msdFilterSelected, action.payload]
      }
    }
    case MSD_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          msdFilterSelected: state.msdFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          msdFilterSelected: state.msdFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTTSDSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TTSD_SELECTED_ADD: {
      return {
        ...state,
        ttsdFilterSelected: [...state.ttsdFilterSelected, action.payload]
      }
    }
    case TTSD_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          ttsdFilterSelected: state.ttsdFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          ttsdFilterSelected: state.ttsdFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterHTSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case HT_SELECTED_ADD: {
      return {
        ...state,
        htFilterSelected: [...state.htFilterSelected, action.payload]
      }
    }
    case HT_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          htFilterSelected: state.htFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          htFilterSelected: state.htFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}