import { TOANBOTAISANRAVAO_DATA, TOANBOTAISANRAVAO_FAILED, TOANBOTAISANRAVAO_LOADING,
    } from '../../../redux/actions/lichsuravao.action'
    
    const initialState = {
        toanbotaisanData: [],
    
        isLoading: false,
        isSuccess: false
    }
    
    // Reducer
    
    export const toanbodauTSRaVaoReducer = (state = initialState, action) => {
      switch (action.type) {
        case TOANBOTAISANRAVAO_LOADING: {
          return {
            isLoading: true,
            isSuccess: false,
          }
        }
        case TOANBOTAISANRAVAO_DATA: {
          const result = action.payload.data.result.items;
          return {
            isLoading: false,
            isSuccess: true,
            toanbotaisanData: result
          }
        }
        case TOANBOTAISANRAVAO_FAILED: {
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
    
   
    
   
   