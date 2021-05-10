import React, { createContext, useReducer } from 'react';

import PropTypes from 'prop-types';
import authReducer from '../reducers/authReducer';

const refreshTokenString = localStorage.getItem('refreshToken') || null;
const refreshToken = JSON.parse(refreshTokenString);

const initialState = {
  user: null,
  loading: false,
  accessToken: null,
  refreshToken,
};

export const Context = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
