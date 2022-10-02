import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
export const tmbdApi = createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}&language=en-US`,
    }),
    //* Get Movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // search by name ---> iron man, ...
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&language=en-US&page=1`;
        }
        // category ---> popular, trending, upcoming
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
        }
        // genre id ---> 1, 24, ...
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?api_key=${tmdbApiKey}&language=en-US&s&page=${page}&with_genres=${genreIdOrCategoryName}`;
        }
        return `movie/popular?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = tmbdApi;
