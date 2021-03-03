import React, { useState, createContext } from 'react';
import ErrorBoundary from '../components/error-boundary/error-boundary';

import Header from '../components/header/header/header';
import Content from '../components/content/content/content';

export const UsernameContext = createContext(null);

function MainPage() {
  const [username, setUsername] = useState('');

  const handleUsername = (data) => setUsername(`${data.firstName} ${data.lastName}`);

  return (
    <>
      <ErrorBoundary>
        <UsernameContext.Provider value={username}>
          <Header />
        </UsernameContext.Provider>
        <Content handleUsername={handleUsername} />
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
