import { TOANBOKIEMKE_DATA, TOANBOKIEMKE_FAILED, TOANBOKIEMKE_LOADING,
} from '../../redux/actions/kiemkeTS.action'

const initialState = {
    toanbotaisanData: [[]],

    isLoading: false,
    isSuccess: false
}

// Reducer

export const toanbokiemkeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOANBOKIEMKE_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TOANBOKIEMKE_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        toanbotaisanData: result
      }
    }
    case TOANBOKIEMKE_FAILED: {
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




