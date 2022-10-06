import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  const favorites = [];
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
      {!favorites.length
        ? (<Typography>Add favorites or watchlist of movies</Typography>)
        : (
          <Box>
            Favorite Movies
          </Box>
        )}
    </Box>
  );
};

export default Profile;
