import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ClassNames } from '@emotion/react';
import {
  Actors,
  MovieInformation,
  Movies,
  Profile,
  NavBar,
} from './components/index';
import useStyle from './components/styles';

const App = () => {
  const classes = useStyle();
  return (
    <div className={ClassNames.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
