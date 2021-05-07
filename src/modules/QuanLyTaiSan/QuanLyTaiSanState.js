import { TOANBOTAISAN_DATA, TOANBOTAISAN_FAILED, TOANBOTAISAN_LOADING, TOANBOTAISAN_SEARCH,
TAISANHONG_DATA, TAISANHONG_FAILED, TAISANHONG_LOADING, TAISANHONG_SEARCH,
TAISANMAT_DATA, TAISANMAT_FAILED, TAISANMAT_LOADING, TAISANMAT_SEARCH,
TAISANTHANHLY_DATA, TAISANTHANHLY_FAILED, TAISANTHANHLY_LOADING, TAISANTHANHLY_SEARCH,
TAISANDANGSUDUNG_LOADING, TAISANDANGSUDUNG_DATA, TAISANDANGSUDUNG_FAILED, TAISANDANGSUDUNG_SEARCH,
TAISANCHUASUDUNG_LOADING, TAISANCHUASUDUNG_DATA, TAISANCHUASUDUNG_FAILED, TAISANCHUASUDUNG_SEARCH,
TAISANSUACHUABAODUONG_DATA, TAISANSUACHUABAODUONG_FAILED, TAISANSUACHUABAODUONG_LOADING, TAISANSUACHUABAODUONG_SEARCH } from '../../redux/actions/quanlytaisan.actions'

const initialState = {
    toanbotaisanData: [],
    taisanmatData: [],
    taisanhongData: [],
    taisanthanhlyData: [],
    taisanchuasudungData: [],
    taisandangsudungData: [],
    taisansuachuabaoduongData: [],

    isLoading: false,
    isSuccess: false,

    toanbotaisanTotal: 0,
    taisanmatTotal: 0,
    taisanhongTotal: 0,
    taisanthanhlyTotal: 0,
    taisanchuasudungTotal: 0,
    taisandangsudungTotal: 0,
    taisansuachuabaoduongTotal: 0,
}

// Reducer

export const toanbotaisanReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOANBOTAISAN_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
        ...state
      }
    }
    case TOANBOTAISAN_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        toanbotaisanTotal: action.payload.data.result.totalCount,
        toanbotaisanData: [...state.toanbotaisanData, ...result]
      }
    } 
    case TOANBOTAISAN_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        toanbotaisanTotal: action.payload.data.result.totalCount,
        toanbotaisanData: result
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

export const taisanmatReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANMAT_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANMAT_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanmatTotal: action.payload.data.result.totalCount,
        taisanmatData: [...state.taisanmatData, ...result]
      }
    }
    case TAISANMAT_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanmatTotal: action.payload.data.result.totalCount,
        taisanmatData: result
      }
    }
    case TAISANMAT_FAILED: {
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

export const taisanhongReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANHONG_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANHONG_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanhongTotal: action.payload.data.result.totalCount,
        taisanhongData: [...state.taisanhongData, ...result]
      }
    }
    case TAISANHONG_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanhongTotal: action.payload.data.result.totalCount,
        taisanhongData: result
      }
    }
    case TAISANHONG_FAILED: {
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

export const taisanthanhlyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANTHANHLY_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANTHANHLY_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanthanhlyTotal: action.payload.data.result.totalCount,
        taisanthanhlyData: [...state.taisanthanhlyData, ...result]
      }
    }
    case TAISANTHANHLY_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanthanhlyTotal: action.payload.data.result.totalCount,
        taisanthanhlyData: result
      }
    }
    case TAISANTHANHLY_FAILED: {
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

export const taisandangsudungReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANDANGSUDUNG_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANDANGSUDUNG_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisandangsudungTotal: action.payload.data.result.totalCount,
        taisandangsudungData: [...state.taisandangsudungData, ...result]
      }
    }
    case TAISANDANGSUDUNG_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisandangsudungTotal: action.payload.data.result.totalCount,
        taisandangsudungData: result
      }
    }
    case TAISANDANGSUDUNG_FAILED: {
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

export const taisanchuasudungReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANCHUASUDUNG_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANCHUASUDUNG_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanchuasudungTotal: action.payload.data.result.totalCount,
        taisanchuasudungData: [...state.taisanchuasudungData, ...result]
      }
    }
    case TAISANCHUASUDUNG_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanchuasudungTotal: action.payload.data.result.totalCount,
        taisanchuasudungData: result
      }
    }
    case TAISANCHUASUDUNG_FAILED: {
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

export const taisansuachuabaoduongReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANSUACHUABAODUONG_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANSUACHUABAODUONG_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisansuachuabaoduongTotal: action.payload.data.result.totalCount,
        taisansuachuabaoduongData: [...state.taisanchuasudungData, ...result]
      }
    }
    case TAISANSUACHUABAODUONG_SEARCH: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisansuachuabaoduongTotal: action.payload.data.result.totalCount,
        taisansuachuabaoduongData: result
      }
    }
    case TAISANSUACHUABAODUONG_FAILED: {
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