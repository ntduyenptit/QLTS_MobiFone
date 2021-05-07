import { TOANBODAUDOCDIDONG_DATA, TOANBODAUDOCDIDONG_FAILED, TOANBODAUDOCDIDONG_LOADING,
  DAUDOCDIDONGDANGSUDUNG_LOADING, DAUDOCDIDONGDANGSUDUNG_DATA, DAUDOCDIDONGDANGSUDUNG_FAILED,
  DAUDOCDIDONGCHUASUDUNG_LOADING, DAUDOCDIDONGCHUASUDUNG_DATA, DAUDOCDIDONGCHUASUDUNG_FAILED,
  } from '../../../redux/actions/quanlydaudoc.actions'
  
  const initialState = {
      toanbotaisanData: [],
      taisanchuasudungData: [],
      taisandangsudungData: [],
  
      isLoading: false,
      isSuccess: false
  }
  
  // Reducer
  
  export const toanbodaudocDidongReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOANBODAUDOCDIDONG_LOADING: {
        return {
          isLoading: true,
          isSuccess: false,
        }
      }
      case TOANBODAUDOCDIDONG_DATA: {
        const result = action.payload.data.result.items;
        return {
          isLoading: false,
          isSuccess: true,
          toanbotaisanData: result
        }
      }
      case TOANBODAUDOCDIDONG_FAILED: {
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
  
 
  
 
  
  export const daudocdidongdangsudungReducer = (state = initialState, action) => {
    switch (action.type) {
      case DAUDOCDIDONGDANGSUDUNG_LOADING: {
        return {
          isLoading: true,
          isSuccess: false,
        }
      }
      case DAUDOCDIDONGDANGSUDUNG_DATA: {
        const result = action.payload.data.result.items;
        return {
          isLoading: false,
          isSuccess: true,
          taisandangsudungData: result
        }
      }
      case DAUDOCDIDONGDANGSUDUNG_FAILED: {
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
  
  export const daudocdidongchuasudungReducer = (state = initialState, action) => {
    switch (action.type) {
      case DAUDOCDIDONGCHUASUDUNG_LOADING: {
        return {
          isLoading: true,
          isSuccess: false,
        }
      }
      case DAUDOCDIDONGCHUASUDUNG_DATA: {
        const result = action.payload.data.result.items;
        return {
          isLoading: false,
          isSuccess: true,
          taisanchuasudungData: result
        }
      }
      case DAUDOCDIDONGCHUASUDUNG_FAILED: {
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
  
 