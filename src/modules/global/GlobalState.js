import { SHOW_FILTER, HIDE_FILTER, DVQL_FILTER, LTS_FILTER, NCC_FILTER, MSD_FILTER } from '../../redux/actions/filter.actions'
import { screens } from '../../api/config';
import { CURRENT_SCREEN } from '../../redux/actions/screen.actions';

const initialState = {
    isShowFilter: false,
    screenName: screens.quan_ly_tai_san,
    dvqlDataFilter: [],
    ltsDataFilter: [],
    nccDataFilter: [],
    msdDataFilter: []
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