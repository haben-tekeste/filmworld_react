import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMDB';
import currentGenreOrCategoryReducer from '../features/currentGenreOrCategory';
import userReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    [tmbdApi.reducerPath]: tmbdApi.reducer,
    currentGenreOrCategory: currentGenreOrCategoryReducer,
    user: userReducer,
  },
});
