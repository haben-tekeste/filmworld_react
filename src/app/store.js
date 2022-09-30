import { configureStore } from '@reduxjs/toolkit';
import { tmbdApi } from '../services/TMDB';

export const store = configureStore({
  reducer: {
    [tmbdApi.reducerPath]: tmbdApi.reducer,
  },
});
