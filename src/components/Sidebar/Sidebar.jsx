import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  // ListItemIcon,
  // Box,
  // CircularProgress,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { ThemeContext } from '@emotion/react';
import useStyles from './styles';

const Sidebar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const categories = [
    {
      label: 'Popular',
      value: 'popular',
    },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];
  const demoCategories = [
    {
      label: 'Comedy',
      value: 'comedy',
    },
    { label: 'Action', value: 'action' },
    { label: 'Horror', value: 'horror' },
    { label: 'Animation', value: 'animation' },
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
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt="logo"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} to="/" className={classes.links}>
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt="logo"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
