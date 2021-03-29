import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: '10px',
  },
  dropdown: {
    display: 'block',
    position: 'absolute',
    padding: '15px 0',
    listStyle: 'none',
    textDecoration: 'none',
    boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
    lineHeight: '30px',
  },
  username: {
    marginRight: '20px',
  },
}));

function UserAvatar({ user }) {
  const { id, name } = user;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.avatar}>
          <Avatar
            src={`http://localhost:4000/api/v1/users/${id}/avatar`}
            alt="user-avatar"
            onClick={handleClick}
          />

          {open && (
            <ul className={classes.dropdown}>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/login">
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
