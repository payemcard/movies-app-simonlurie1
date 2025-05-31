import React, { useEffect } from 'react';
import { Movie } from '../../types/movie';
import './MovieDetails.css';
import { useToggleMovieWatchedMutation } from '../../store/api/movieApi';
import { useNavigate } from 'react-router-dom';
import naImage from '../../assets/na.png';

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const navigate = useNavigate();

  const [toggleWatched] = useToggleMovieWatchedMutation();
  const [imgSrc, setImgSrc] = React.useState(movie.thumbnail);

  useEffect(() => {
    setImgSrc(movie.thumbnail);
  }, [movie.thumbnail]);

  const onToggleWatched = (id: string) => {
    toggleWatched(id.toString());
  };

  const handleImageError = () => {
    setImgSrc(naImage);
  };

  const onClose = () => {
    navigate('/');
  };

  return (
    <div className="movie-details-overlay">
      <div className="movie-details">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="movie-details-content">
          <div className="movie-details-left">
            <img
              alt={movie.name}
              src={imgSrc}
              className="movie-details-thumbnail"
              onError={handleImageError}
            />
          </div>
          <div className="movie-details-right">
            <h2>{movie.name}</h2>
            <div className="movie-info">
              <p>
                <strong>Rating:</strong> {movie.rating}/10
              </p>
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={movie.watched ? 'watched' : 'not-watched'}>
                  {movie.watched ? 'Watched' : 'Not Watched'}
                </span>
              </p>
              <a href={movie.imdb_url} target="_blank" className="imdb-link" rel="noreferrer">
                View on IMDb
              </a>
            </div>
            <button className="toggle-watched-button" onClick={() => onToggleWatched(movie.id)}>
              {movie.watched ? 'Already Watched' : 'Mark as Watched'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
