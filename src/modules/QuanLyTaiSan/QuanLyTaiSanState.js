import { TOANBOTAISAN_DATA, TOANBOTAISAN_FAILED, TOANBOTAISAN_LOADING } from '../../redux/actions/toanbotaisan.actions'

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false
}

// Reducer

const toanbotaisanReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOANBOTAISAN_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TOANBOTAISAN_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        data: result
      }
    }
    case TOANBOTAISAN_FAILED: {
        return {
            isLoading: false,
            isSuccess: false,
          }
    }
    default: {
      return state
    }
  }
}

export default toanbotaisanReducer