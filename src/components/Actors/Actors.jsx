import React, { useState } from 'react';
import { Box, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetActorQuery, useGetMoviesByActorQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: moviesByActor } = useGetMoviesByActorQuery({ id, page });
  const classes = useStyles();
  const navigate = useNavigate();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          tIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        />
        Go back
      </Box>
    );
  }
  console.log(data);
  return (
    <>
      <Grid container className={classes.containerSpaceAround} spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no bio available'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            > Imdb
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            > Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {moviesByActor && <MovieList movies={moviesByActor.results} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={moviesByActor?.total_pages} />
      </Box>
    </>
  );
};

export default Actors;
