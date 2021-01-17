import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './avatar.css';
import UserAvatar from '../../../images/user-avatar.jpg';

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
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      ) : null}
    </div>
  );
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Avatar;
