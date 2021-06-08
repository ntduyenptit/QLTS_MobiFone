import { TOANBOTAISAN_DATA, TOANBOTAISAN_FAILED, TOANBOTAISAN_LOADING, TOANBOTAISAN_REMOVE,
TAISANHONG_DATA, TAISANHONG_FAILED, TAISANHONG_LOADING, TAISANHONG_REMOVE,
TAISANMAT_DATA, TAISANMAT_FAILED, TAISANMAT_LOADING, TAISANMAT_REMOVE,
TAISANHUY_DATA, TAISANHUY_FAILED, TAISANHUY_LOADING, TAISANHUY_REMOVE,
TAISANTHANHLY_DATA, TAISANTHANHLY_FAILED, TAISANTHANHLY_LOADING, TAISANTHANHLY_REMOVE,
TAISANDANGSUDUNG_LOADING, TAISANDANGSUDUNG_DATA, TAISANDANGSUDUNG_FAILED, TAISANDANGSUDUNG_REMOVE,
TAISANCHUASUDUNG_LOADING, TAISANCHUASUDUNG_DATA, TAISANCHUASUDUNG_FAILED, TAISANCHUASUDUNG_REMOVE,
TAISANSUACHUABAODUONG_DATA, TAISANSUACHUABAODUONG_FAILED, TAISANSUACHUABAODUONG_LOADING, TAISANSUACHUABAODUONG_REMOVE,
KHAIBAOHONGMAT_DATA, KHAIBAOHONGMAT_FAILED, KHAIBAOHONGMAT_LOADING, KHAIBAOHONGMAT_REMOVE, } from '../../redux/actions/quanlytaisan.actions'

const initialState = {
    toanbotaisanData: [],
    taisanmatData: [],
    taisanhongData: [],
    taisanhuyData:[],
    taisanthanhlyData: [],
    taisanchuasudungData: [],
    taisandangsudungData: [],
    taisansuachuabaoduongData: [],
    khaibaohongmatData: [],

    isLoading: false,
    isSuccess: false,

    toanbotaisanTotal: 0,
    taisanmatTotal: 0,
    taisanhongTotal: 0,
    taisanhuyTotal:0,
    taisanthanhlyTotal: 0,
    taisanchuasudungTotal: 0,
    taisandangsudungTotal: 0,
    taisansuachuabaoduongTotal: 0,
    khaibaohongmatTotal: 0,
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
    case TOANBOTAISAN_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        toanbotaisanTotal: 0,
        toanbotaisanData: []
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
    case TAISANMAT_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisanmatTotal: 0,
        taisanmatData: []
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
    case TAISANHONG_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisanhongTotal: 0,
        taisanhongData: []
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
export const taisanhuyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAISANHUY_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case TAISANHUY_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        taisanhuyTotal: action.payload.data.result.totalCount,
        taisanhuyData: [...state.taisanhuyData, ...result]
      }
    }
    case TAISANHUY_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisanhuyTotal: 0,
        taisanhuyData: []
      }
    }
    case TAISANHUY_FAILED: {
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
    case TAISANTHANHLY_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisanthanhlyTotal: 0,
        taisanthanhlyData: []
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
    case TAISANDANGSUDUNG_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisandangsudungTotal: 0,
        taisandangsudungData: []
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
    case TAISANCHUASUDUNG_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisanchuasudungTotal: 0,
        taisanchuasudungData: []
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
        taisansuachuabaoduongData: [...state.taisansuachuabaoduongData, ...result]
      }
    }
    case TAISANSUACHUABAODUONG_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        taisansuachuabaoduongTotal: 0,
        taisansuachuabaoduongData: []
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

export const khaibaohongmatReducer = (state = initialState, action) => {
  switch (action.type) {
    case KHAIBAOHONGMAT_LOADING: {
      return {
        isLoading: true,
        isSuccess: false,
      }
    }
    case KHAIBAOHONGMAT_DATA: {
      const result = action.payload.data.result.items;
      return {
        isLoading: false,
        isSuccess: true,
        khaibaohongmatTotal: action.payload.data.result.totalCount,
        khaibaohongmatData: [...state.taisansuachuabaoduongData, ...result]
      }
    }
    case KHAIBAOHONGMAT_REMOVE: {
      return {
        isLoading: false,
        isSuccess: true,
        khaibaohongmatTotal: 0,
        khaibaohongmatData: []
      }
    }
    case KHAIBAOHONGMAT_FAILED: {
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