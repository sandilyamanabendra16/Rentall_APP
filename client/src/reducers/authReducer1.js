// src/reducers/authReducer.js
const initialState = {
    userId:null,
    token: localStorage.getItem('token'),
    role:null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', payload.token);
        localStorage.setItem("userId", payload.userId)
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case 'REGISTER_FAIL':
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        return {
          ...state,
          userId:null,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: payload,
        };
      default:
        return state;
    }
  }
  