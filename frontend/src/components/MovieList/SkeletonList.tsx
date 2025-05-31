import react from 'react';

const SkeletonList: react.FC = () => {
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
};

export default SkeletonList;
