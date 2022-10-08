import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    padding: '2em',
    width: '100%',
    flexGrow: '1',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
}));
