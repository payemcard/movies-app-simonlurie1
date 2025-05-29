import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { useGetMovieByIdQuery } from '../store/api/movieApi';

const MovieDetailsWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get('movie');
  const { data: movie } = useGetMovieByIdQuery(movieId || '', { skip: !movieId });

  if (!movieId || !movie) {
    return null;
  }

  return <MovieDetails movie={movie} />;
};

export default MovieDetailsWrapper;
