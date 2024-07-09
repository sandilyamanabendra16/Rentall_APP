// src/actions/authActions.js
import axios from 'axios';

export const register = (userData) => async (dispatch) => {
  try {
    const {data} = await axios.post('http://localhost:8000/api/auth/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (err) {
    console.log(err)
    dispatch({ type: 'REGISTER_FAIL', payload: err});
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const {data} = await axios.post('http://localhost:8000/api/auth/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload:data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
