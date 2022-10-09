import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
    background: theme.palette.mode === 'dark' && '#121212',
    color: theme.palette.mode === 'dark' && '#fff',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
  list: {
    background: theme.palette.mode === 'dark' && '#121212',
    color: theme.palette.mode === 'dark' && '#fff',
  },
}));
