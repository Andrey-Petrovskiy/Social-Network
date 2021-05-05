import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserAvatarContainer from '../../containers/user/UserAvatar';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useStyles } from './styles';

function Header() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/add-article' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/profile' && value !== 2) {
      setValue(2);
    }
  }, [value]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabContainer}
            indicatorColor="primary"
          >
            <Tab className={classes.tab} component={Link} to="/" label="Articles" />
            <Tab className={classes.tab} component={Link} to="/add-article" label="Add Article" />
            <Tab className={classes.tab} component={Link} to="/profile" label="Profile" />
          </Tabs>
          <UserAvatarContainer />
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}

export default Header;
