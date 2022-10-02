import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, keyframes } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/currentGenreOrCategory';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const handleBar = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleBar}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
