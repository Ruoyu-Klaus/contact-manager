import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGINOUT,
  CLEAR_ERRORS,
} from '../types';

import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  // Register User
  const register = async formData => {
    const config = { header: { 'content-type': 'application/json' } };
    try {
      const res = await axios.post('/api/users', formData, config);
      //PASS THE TOKEN ONCE SUCCESS
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      console.log(error.response);
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // Login User
  const loginUser = async formData => {
    const config = { header: { 'content-type': 'application/json' } };
    try {
      const res = await axios.post('/api/auth', formData, config);
      //PASS THE TOKEN ONCE SUCCESS
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  //Logout
  const logoutUser = () => dispatch({ type: LOGINOUT });
  //Clear Errors
  const clearError = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        loginUser,
        logoutUser,
        clearError,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
