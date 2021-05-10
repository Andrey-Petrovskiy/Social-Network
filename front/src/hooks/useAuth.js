import { useCallback, useContext } from 'react';

import { apiClient } from '../config/axios';
import { Context } from '../contexts/authContext';

function useAuth() {
  const [state, dispatch] = useContext(Context);

  const refresh = useCallback(() => {
    if (state.refreshToken?.expires) {
      const now = new Date();
      const expires = new Date(state.refreshToken.expires);

      if (now.getTime() < expires.getTime()) {
        return apiClient
          .post('/auth/refresh-tokens', {
            refreshToken: state.refreshToken.token,
          })
          .then((res) => {
            dispatch({
              type: 'SET_AUTH',
              payload: {
                user: res.data.user,
                accessToken: res.data.tokens.access,
                refreshToken: res.data.tokens.refresh,
              },
            });
            localStorage.setItem('refreshToken', JSON.stringify(res.data.tokens.refresh));
          })
          .catch(() => {
            dispatch({
              type: 'SET_AUTH',
              payload: {
                user: null,
                accessToken: null,
                refreshToken: null,
              },
            });
            localStorage.removeItem('refreshToken');
          });
      }
    }

    return false;
  }, [state, dispatch]);

  const login = useCallback(
    (formData) => {
      apiClient.post('/auth/login', formData).then((res) => {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            user: res.data.user,
            accessToken: res.data.tokens.access,
            refreshToken: res.data.tokens.refresh,
          },
        });
        localStorage.setItem('refreshToken', JSON.stringify(res.data.tokens.refresh));
      });
    },
    [dispatch]
  );

  const socialLogin = useCallback(
    (provider, formData) => {
      apiClient
        .post(`/auth/oauth/${provider}`, { access_token: formData._token.accessToken })
        .then((res) => {
          dispatch({
            type: 'SET_AUTH',
            payload: {
              user: res.data.user,
              accessToken: res.data.tokens.access,
              refreshToken: res.data.tokens.refresh,
            },
          });
          localStorage.setItem('refreshToken', JSON.stringify(res.data.tokens.refresh));
        });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    if (state.refreshToken) {
      return apiClient
        .post('/auth/logout', {
          refreshToken: state.refreshToken.token,
        })
        .finally(() => {
          dispatch({
            type: 'SET_AUTH',
            payload: {
              user: null,
              accessToken: null,
              refreshToken: null,
            },
          });
          localStorage.removeItem('refreshToken');
        });
    }

    return false;
  }, [state, dispatch]);

  return {
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    refresh,
    login,
    socialLogin,
    logout,
  };
}

export default useAuth;
