import React from 'react';
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
import { useDispatch } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

const Sidebar = () => {
  const classes = useStyles();
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
  const redLogo = 'https://fontmeme.com/permalink/220927/ace7490cdc8809fc1a07d3fba8266e03.png';
  const blueLogo = 'https://fontmeme.com/permalink/220927/da6a5a94ef4a2659d539e164d357112c.png';
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
      <List>
        <ListSubheader>Categories</ListSubheader>
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
      <List>
        <ListSubheader>Genres</ListSubheader>
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
