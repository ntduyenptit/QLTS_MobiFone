import { TOANBOTHIETBI_DATA, TOANBOTHIETBI_FAILED, TOANBOTHIETBI_LOADING,
    } from '../../../redux/actions/thietbiketnoi.actions'
    
    const initialState = {
        toanbotaisanData: [],
    
        isLoading: false,
        isSuccess: false
    }
    
    // Reducer
    
    export const toanboTBReducer = (state = initialState, action) => {
      switch (action.type) {
        case TOANBOTHIETBI_LOADING: {
          return {
            isLoading: true,
            isSuccess: false,
          }
        }
        case TOANBOTHIETBI_DATA: {
          const result = action.payload.data.result.items;
          return {
            isLoading: false,
            isSuccess: true,
            toanbotaisanData: result
          }
        }
        case TOANBOTHIETBI_FAILED: {
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
    
   
    
   
   