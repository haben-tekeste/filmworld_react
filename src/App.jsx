import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import {
  Actors,
  MovieInformation,
  Movies,
  Profile,
  NavBar,
} from './components/index';

const App = () => {
  console.log('style');
  return (
    <div>
      <CssBaseline />
      <NavBar />
      <h1>Hell there - FilmWorld</h1>
      <main>
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
