import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { useGetMovieByIdQuery } from '../../store/api/movieApi';

const MovieDetailsWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get('movie');
  const {
    data: movie,
    isLoading,
    isFetching,
  } = useGetMovieByIdQuery(movieId || '', { skip: !movieId });

  if (!movieId || !movie) {
    return null;
  }
  if (isLoading || isFetching) {
    return <></>;
  } else {
    return <MovieDetails movie={movie} />;
  }
};

export default MovieDetailsWrapper;
