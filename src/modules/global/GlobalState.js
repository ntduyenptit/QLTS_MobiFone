import { SHOW_FILTER, HIDE_FILTER, DVQL_FILTER, LTS_FILTER, NCC_FILTER, MSD_FILTER } from '../../redux/actions/filter.actions'

const initialState = {
    isShowFilter: false,
    dvqlDataFilter: [],
    ltsDataFilter: [],
    nccDataFilter: [],
    msdDataFilter: []
}

// Reducer

export const filterReducer = (state = initialState, action) => {
  const screen = action.payload.screen.screenName;
  switch (action.type) {
    case SHOW_FILTER: {
      return {
        isShowFilter: true,
        screen
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

export const filterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVQL_FILTER: {
      return {
        dvqlDataFilter: action.payload.result
      }
    }
    case LTS_FILTER: {
      return {
        ltsDataFilter: action.payload.result
      }
    }
    case NCC_FILTER: {
      return {
        nccDataFilter: action.payload.result
      }
    }
    case MSD_FILTER: {
      return {
        msdDataFilter: action.payload.result
      }
    }
    default: {
      return state
    }
  }
}