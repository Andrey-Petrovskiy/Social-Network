import './content.css';
import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../profile/profile';
import AddArticle from '../add-article/add-article';
import Articles from '../articles/articles';
import GreetingPage from '../greeting-page/greeting-page';
import { articles, addArticle, profile } from '../../../variables/tabs';

function Content({ handleUsername, tab, userData }) {
  const displayTab = (tab) => {
    switch (tab) {
      case articles:
        return <Articles />;
      case addArticle:
        return <AddArticle />;
      case profile:
        return <Profile handleUsername={handleUsername} />;
      default:
        return <GreetingPage userData={userData} />;
    }
  };

  return <div className="content-container">{displayTab(tab)}</div>;
}

Content.propTypes = {
  tab: PropTypes.string,
};

Content.defaultProps = {
  tab: null,
};

export default Content;
