import React, { useMemo, useState } from 'react';
import { useGetMoviesQuery } from '../../store/api/movieApi';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';
import naImage from '../../assets/na.png';
import GenreTabs from '../GenreTabs/GenreTabs';
import { Movie } from '../../types/movie';
import SkeletonList from './SkeletonList';

const MovieList: React.FC = () => {
  const { data: movies = [], isLoading, error } = useGetMoviesQuery();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const navigate = useNavigate();

  const handleMovieClick = (movieId: string) => {
    navigate(`?movie=${movieId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = naImage;
  };

  const filteredMovies = useMemo(() => {
    return selectedGenre === 'All'
      ? movies
      : movies?.filter((movie: Movie) => movie.genre === selectedGenre);
  }, [selectedGenre, movies]);

  const allGenres = useMemo(() => {
    return ['All', ...new Set(movies.map(movie => movie.genre))];
  }, [movies]);

  if (isLoading) {
    return <SkeletonList />;
  }

  if (error) {
    return (
      <div className="movie-list-empty">
        <p>Error loading movies. Please try again later.</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <p>No movies found. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <GenreTabs
        tabs={allGenres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={movie.thumbnail || naImage}
              alt={movie.name}
              className="movie-thumbnail"
              onError={handleImageError}
            />
            <h3 className="movie-name">{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
