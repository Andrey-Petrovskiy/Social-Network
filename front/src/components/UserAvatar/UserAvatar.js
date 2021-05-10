import React, { useState } from 'react';

import { avatarUrl } from '../../config/variables';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';

import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useStyles } from './styles';

function UserAvatar({ user, logout }) {
  const classes = useStyles();

  const { id, name } = user;

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

          {open && <HeaderDropdown onClickLogout={onClickLogout} />}
        </div>
      </ClickAwayListener>
      <div className={classes.username}>{name}</div>
    </>
  );
}

export default UserAvatar;
