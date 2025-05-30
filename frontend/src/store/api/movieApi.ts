import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../types/movie';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/movies',
    prepareHeaders: headers => {
      return headers;
    },
  }),
  endpoints: builder => ({
    getMovies: builder.query<Movie[], void>({
      query: () => '',
      transformErrorResponse: response => {
        console.error('Error fetching movies:', response);
        return response;
      },
    }),
    getMovieById: builder.query<Movie, string>({
      query: id => `/${id}`,
      transformErrorResponse: (response, meta, arg) => {
        console.error(`Error fetching movie ${arg}:`, response);
        return response;
      },
    }),
    toggleMovieWatched: builder.mutation<Movie, string>({
      query: id => ({
        url: `/${id}`,
        method: 'PUT',
        body: { watched: true },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            movieApi.util.updateQueryData('getMovieById', arg.toString(), draft => {
              if (draft) {
                draft.watched = data.watched;
              }
            })
          );
        } catch (e) {
          console.error(`Error Updating movie`);
        }
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useToggleMovieWatchedMutation } = movieApi;
