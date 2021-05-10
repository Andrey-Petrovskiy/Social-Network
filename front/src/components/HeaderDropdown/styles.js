import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
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
}));
