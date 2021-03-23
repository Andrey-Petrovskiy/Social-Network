import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from '../components/Header';
import Body from '../components/Body';
import theme from './../Theme';

function App() {
  const [username, setUsername] = useState('');

  const handleUsername = (data) => setUsername(`${data.firstName} ${data.lastName}`);

  return (
    <ThemeProvider theme={theme}>
      <Header username={username} />
      <Body handleUsername={handleUsername} />
    </ThemeProvider>
  );
}

export default App;
