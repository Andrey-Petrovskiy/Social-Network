import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

function LoginHeader() {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => history.push('/login');

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Typography variant="h3" className={classes.logoContainer}>
            inTouch
          </Typography>
          <Button variant="outlined" className={classes.tab} onClick={handleClick}>
            SignUp/SignIn
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}

export default LoginHeader;
