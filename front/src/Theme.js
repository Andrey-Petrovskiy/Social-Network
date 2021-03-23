import { createMuiTheme } from '@material-ui/core/styles';

const customBlue = '#0B72B9';

export default createMuiTheme({
  palette: {
    common: {
      blue: customBlue,
    },
    primary: {
      main: customBlue,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
});
