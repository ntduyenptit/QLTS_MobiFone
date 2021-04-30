import { TOANBOTAISAN_DATA, TOANBOTAISAN_FAILED, TOANBOTAISAN_LOADING,
TAISANHONG_DATA, TAISANHONG_FAILED, TAISANHONG_LOADING,
TAISANMAT_DATA, TAISANMAT_FAILED, TAISANMAT_LOADING,
TAISANTHANHLY_DATA, TAISANTHANHLY_FAILED, TAISANTHANHLY_LOADING,
TAISANDANGSUDUNG_LOADING, TAISANDANGSUDUNG_DATA, TAISANDANGSUDUNG_FAILED,
TAISANCHUASUDUNG_LOADING, TAISANCHUASUDUNG_DATA, TAISANCHUASUDUNG_FAILED,
TAISANSUACHUABAODUONG_DATA, TAISANSUACHUABAODUONG_FAILED, TAISANSUACHUABAODUONG_LOADING } from '../../redux/actions/quanlytaisan.actions'

const initialState = {
    toanbotaisanData: [],
    taisanmatData: [],
    taisanhongData: [],
    taisanthanhlyData: [],
    taisanchuasudungData: [],
    taisandangsudungData: [],
    taisansuachuabaoduongData: [],

    isLoading: false,
    isSuccess: false
}

// Reducer

export const toanbotaisanReducer = (state = initialState, action) => {
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