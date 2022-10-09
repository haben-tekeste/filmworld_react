import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    background: theme.palette.mode === 'dark' && '#121212',
    color: theme.palette.mode === 'dark' && '#fff',
  },
  toolbar: {
    height: '70px',
    width: '100%',
  },
  content: {
    padding: '2em',
    width: '100%',
    flexGrow: '1',
    // background: theme.palette.mode === 'dark' && '#121212',
    // color: theme.palette.mode === 'dark' && '#fff',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
    },
  },
}));
