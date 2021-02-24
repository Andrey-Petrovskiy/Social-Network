import './avatar.css';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserAvatar from '../../../images/user-avatar.jpg';
import { UsernameContext } from '../../../containers/main-page';

function Avatar() {
  const username = useContext(UsernameContext);

  const [display, setDisplay] = useState(false);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDisplay(!display);
  };

  return (
    <div className="avatar">
      <img src={UserAvatar} alt="UserAvatar" className="avatar-image" onClick={toggleDropdown} />
      <span className="user-name">{username}</span>
      {display ? (
        <ul className="dropdown">
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/login">
            <li>Logout</li>
          </Link>
        </ul>
      ) : null}
    </div>
  );
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Avatar;
