import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';

import Header from './components/Header/Header';
import Body from './components/Body';
import LoginForm from './components/LoginPage/LoginForm';

import useAuth from './hooks/useAuth';
import LoginHeader from './components/LoginPage/LoginHeader/LoginHeader';

function App() {
  const { user, accessToken, refreshToken, refresh } = useAuth();

  useEffect(() => {
    if (!user && refreshToken) {
      refresh();
    }
  }, [user, refreshToken, refresh]);

  return (
    <ThemeProvider theme={theme}>
      {user && accessToken && refreshToken && (
        <>
          <Header />
          <Body />
        </>
      )}
      {!user && (
        <>
          <LoginHeader />
          <LoginForm />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
