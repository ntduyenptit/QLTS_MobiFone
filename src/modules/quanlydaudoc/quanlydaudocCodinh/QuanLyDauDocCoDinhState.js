import { TOANBODAUDOCCODINH_DATA, TOANBODAUDOCCODINH_FAILED, TOANBODAUDOCCODINH_LOADING,
    DAUDOCCODINHDANGSUDUNG_LOADING, DAUDOCCODINHDANGSUDUNG_DATA, DAUDOCCODINHDANGSUDUNG_FAILED,
    DAUDOCCODINHCHUASUDUNG_LOADING, DAUDOCCODINHCHUASUDUNG_DATA, DAUDOCCODINHCHUASUDUNG_FAILED,
    } from '../../../redux/actions/quanlydaudoc.actions'
    
    const initialState = {
        toanbotaisanData: [],
        taisanchuasudungData: [],
        taisandangsudungData: [],
    
        isLoading: false,
        isSuccess: false
    }
    
    // Reducer
    
    export const toanbodaudocCodinhReducer = (state = initialState, action) => {
      switch (action.type) {
        case TOANBODAUDOCCODINH_LOADING: {
          return {
            isLoading: true,
            isSuccess: false,
          }
        }
        case TOANBODAUDOCCODINH_DATA: {
          const result = action.payload.data.result.items;
          return {
            isLoading: false,
            isSuccess: true,
            toanbotaisanData: result
          }
        }
        case TOANBODAUDOCCODINH_FAILED: {
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
    
   
    
   
    
    export const daudoccodinhdangsudungReducer = (state = initialState, action) => {
      switch (action.type) {
        case DAUDOCCODINHDANGSUDUNG_LOADING: {
          return {
            isLoading: true,
            isSuccess: false,
          }
        }
        case DAUDOCCODINHDANGSUDUNG_DATA: {
          const result = action.payload.data.result.items;
          return {
            isLoading: false,
            isSuccess: true,
            taisandangsudungData: result
          }
        }
        case DAUDOCCODINHDANGSUDUNG_FAILED: {
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
    
    export const daudoccodinhchuasudungReducer = (state = initialState, action) => {
      switch (action.type) {
        case DAUDOCCODINHCHUASUDUNG_LOADING: {
          return {
            isLoading: true,
            isSuccess: false,
          }
        }
        case DAUDOCCODINHCHUASUDUNG_DATA: {
          const result = action.payload.data.result.items;
          return {
            isLoading: false,
            isSuccess: true,
            taisanchuasudungData: result
          }
        }
        case DAUDOCCODINHCHUASUDUNG_FAILED: {
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
    
   