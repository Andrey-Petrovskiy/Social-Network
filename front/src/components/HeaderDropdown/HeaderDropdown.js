import React from 'react';
import { Link } from 'react-router-dom';

import { useStyles } from '../UserAvatar/styles';

function HeaderDropdown({ onClickLogout }) {
  const classes = useStyles();

  return (
    <ul className={classes.dropdown}>
      <Link to="/profile">
        <li>Profile</li>
      </Link>
      <Link to="/login" onClick={onClickLogout}>
        <li>Logout</li>
      </Link>
    </ul>
  );
}

export default HeaderDropdown;
