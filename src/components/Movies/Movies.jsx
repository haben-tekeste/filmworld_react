import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory,
  );
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that much that name
          <br />
          please search for something else
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured';

  return (
    <div>
      <MovieList movies={data.results} />
    </div>
  );
};

export default Movies;
