import React, { useState } from 'react';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import Header from '../components/header/header/header';
import Content from '../components/content/content/content';
import userData from '../user-data';

function MainPage() {
  const [tab, setTab] = useState(null);
  const handleTab = (tabName) => () => setTab(tabName);

  const [username, setUsername] = useState(`${userData.firstName} ${userData.lastName}`);
  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(`${event.target[0].value} ${event.target[1].value}`);
  };

  return (
    <>
      <ErrorBoundary>
        <Header handleTab={handleTab} username={username} />
        <Content handleUsername={handleUsername} tab={tab} userData={userData} />
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
