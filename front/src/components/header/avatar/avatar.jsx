import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './avatar.css';
import UserAvatar from '../../../images/user-avatar.jpg';
import AvatarDropdown from '../avatar-dropdown/avatar-dropdown';

function Avatar({ username }) {
  const [display, setDisplay] = useState(false);

  const dropdownDisplay = (display) => (display ? <AvatarDropdown /> : null);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDisplay(!display);
  };

  return (
    <div className="avatar">
      <img src={UserAvatar} alt="UserAvatar" className="avatar-image" onClick={toggleDropdown} />
      <span className="user-name">{username}</span>
      {dropdownDisplay(display)}
    </div>
  );
}

Avatar.propTypes = {
  username: PropTypes.string,
};

export default Avatar;
