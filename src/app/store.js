import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMDB';
import currentGenreOrCategoryReducer from '../features/currentGenreOrCategory';

export const store = configureStore({
  reducer: {
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreOrCategory: currentGenreOrCategoryReducer,
  },
});
