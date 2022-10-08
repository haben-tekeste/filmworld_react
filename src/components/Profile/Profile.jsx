import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { useGetFavoriteOrWatchlistMovieQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetFavoriteOrWatchlistMovieQuery({
    listname: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session'),
    page: 1,
  });
  const { data: watchlistedMovies, refetch: refetchWatchlist } = useGetFavoriteOrWatchlistMovieQuery({
    listname: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session'),
    page: 1,
  });
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistedMovies?.results?.length
        ? (<Typography>Add favorites or watchlist of movies</Typography>)
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchlistedMovies} />
          </Box>
        )}
    </Box>
  );
};

export default Profile;
