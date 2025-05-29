import React from 'react';
import { useGetMoviesQuery } from '../store/api/movieApi';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';
import naImage from '../assets/na.png';

const MovieList: React.FC = () => {
  const { data: movies = [], isLoading, error } = useGetMoviesQuery();

  const navigate = useNavigate();

  const handleMovieClick = (movieId: string) => {
    navigate(`?movie=${movieId}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = naImage;
  };

  if (isLoading) {
    return (
      <div className="movie-list">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="movie-card skeleton">
            <div className="skeleton-thumbnail"></div>
            <div className="skeleton-title"></div>
          </div>
        ))}
      </div>
    );
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
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
          <img
            src={movie.thumbnail}
            alt={movie.name}
            className="movie-thumbnail"
            onError={handleImageError}
          />
          <h3 className="movie-name">{movie.name}</h3>
          {movie.isWatched && <span className="watched-badge">Watched</span>}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
