import React from 'react';
import PropTypes from 'prop-types';
import { filePropType, userPropType, articlePropType } from '../../../user-prop-types';

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
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.shape({
      fileId: PropTypes.number,
      file: filePropType,
    }),
    friends: PropTypes.arrayOf(userPropType),
    articles: PropTypes.arrayOf(articlePropType),
  }),
};

export default GreetingPage;
