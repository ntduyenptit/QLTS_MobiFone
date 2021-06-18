import { USER_LOGIN, USER_LOGOUT } from '../../redux/actions/user.actions'

const initialState = {
    isLoggedIn: false,
}

// Reducer

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      
      const token = action.payload.token.userToken;
      console.warn("token: "+token);
      return {
        isLoggedIn: true,
        token,
      }
    }
    case USER_LOGOUT: {
      return {
        isLoggedIn: false,
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer