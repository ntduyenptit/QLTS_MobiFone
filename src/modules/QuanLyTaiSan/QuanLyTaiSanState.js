import { LOADING, FINISH } from '../../redux/actions/quanlytaisan.actions'

const initialState = {

    isLoading: false,
}

// Reducer

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        isLoading: true,
      }
    }
    case FINISH: {
      return {
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}