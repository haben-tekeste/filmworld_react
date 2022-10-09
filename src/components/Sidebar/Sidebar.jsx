import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const categories = [
    {
      label: 'Popular',
      value: 'popular',
    },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];
  const redLogo = 'https://fontmeme.com/permalink/221009/c9b2695a66303892565b83a96cc1fa7c.png';
  const blueLogo = 'https://fontmeme.com/permalink/220927/da6a5a94ef4a2659d539e164d357112c.png';
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Cinemy Logo"
          className={classes.image}
        />
      </Link>
      <Divider />
      <List className={classes.list}>
        <ListSubheader style={{ backgroundColor: theme.palette.mode === 'dark' && '#121212', color: theme.palette.mode === 'dark' && '#fff' }}>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt="logo"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className={classes.list}>
        <ListSubheader style={{ backgroundColor: theme.palette.mode === 'dark' && '#121212', color: theme.palette.mode === 'dark' && '#fff' }}>Genres</ListSubheader>
        { !isFetching ? data.genres.map(({ name, id }) => (
          <Link key={id} to="/" className={classes.links}>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase()]}
                  alt="logo"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )) : (
          <Box display="flex">
            <CircularProgress />
          </Box>
        )}
      </List>
    </>
  );
};

export default Sidebar;
