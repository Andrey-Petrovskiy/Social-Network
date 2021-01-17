import React from 'react';
import PropTypes from 'prop-types';
import { userPropType, articlePropType } from '../../../user-prop-types';

function GreetingPage({ userData }) {
  const userCredentials = `${userData.firstName} ${userData.lastName}`;
  const friendCredentials = `${userData.friends[0].firstName} ${userData.friends[0].lastName}`;
  const article = `${userData.articles[0].title}`;

  return (
    <div className="articles">
      <h1>
        Hello, {userCredentials}! {friendCredentials} liked {article}
      </h1>
    </div>
  );
}

GreetingPage.propTypes = {
  userData: PropTypes.shape({
    userPropType,
    friends: PropTypes.arrayOf(userPropType),
    articles: PropTypes.arrayOf(articlePropType),
  }),
};

GreetingPage.defaultProps = {
  userData: null,
};

export default GreetingPage;
