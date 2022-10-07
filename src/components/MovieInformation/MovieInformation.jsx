import React, { useState, useEffect } from 'react';
import {
  Modal,
  Typography,
  Box,
  Grid,
  ButtonGroup,
  Button,
  Rating,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  Theaters,
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetFavoriteOrWatchlistMovieQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres/index';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';

const MovieInformation = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(userSelector);
  console.log('user',user);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ id, list: '/recommendations' });
  const { data: favoriteMovies } = useGetFavoriteOrWatchlistMovieQuery({ listname: 'favorite/listname', id, sessionId: localStorage.getItem('session'), page: 1 });
  const { data: watchlistedMovies } = useGetFavoriteOrWatchlistMovieQuery({ listname: 'watchlist/listname', id, sessionId: localStorage.getItem('session'), page: 1 });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  };

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === id)); // check if movie is favorited or not upon start
  }, [isMovieFavorited, data]);

  useEffect(() => {
    setIsMovieFavorited(!!watchlistedMovies?.results?.find((movie) => movie?.id === id)); // check if movie is favorited or not upon start
  }, [setIsMovieWatchlisted, data]);

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
        <Link to="/">Something went wrong -- Go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom align="center">
            {data?.runtime}min | Language:
            {`${data?.spoken_languages[0].name}`}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="logo"
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sytle={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data
            && data.credits?.cast?.map(
              (character, i) => character.profile_path && (
              <Grid
                style={{ textDecoration: 'none' }}
                item
                key={i}
                xs={4}
                md={2}
                component={Link}
                to={`/actors/${character.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                  className={classes.castImage}
                />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
              </Grid>
              ),
            ).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https:://imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContiner}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={!isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {/* Recommendation */}
        {recommendations ? <MovieList movies={recommendations.results} numberOfMovies={12} /> : <Box>Sorry, nothing was found</Box>}
      </Box>
      {/* Trailer */}
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results.length && (
        <iframe
          className={classes.video}
          frameBorder="0"
          autoPlay
          title="trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow="autoplay"
        />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
