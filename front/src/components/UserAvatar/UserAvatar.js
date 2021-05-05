import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { avatarUrl } from '../../config/variables';

import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useStyles } from './styles';

function UserAvatar({ user, logout }) {
  const { id, name } = user;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const onClickLogout = () => {
    logout();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.avatar}>
          <Avatar src={avatarUrl(id)} alt="user-avatar" onClick={handleClick} />

          {open && (
            <ul className={classes.dropdown}>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/login" onClick={onClickLogout}>
                <li>Logout</li>
              </Link>
            </ul>
          )}
        </div>
      </ClickAwayListener>
      <div className={classes.username}>{name}</div>
    </>
  );
}

export default UserAvatar;
