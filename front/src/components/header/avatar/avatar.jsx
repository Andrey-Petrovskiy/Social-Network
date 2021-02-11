import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './avatar.css';
import UserAvatar from '../../../images/user-avatar.jpg';
import { Link } from 'react-router-dom';

function Avatar({ username }) {
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
