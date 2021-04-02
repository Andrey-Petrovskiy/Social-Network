import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from '../components/Header';
import Body from '../components/Body';
import theme from './../Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Body />
    </ThemeProvider>
  );
}

export default App;
