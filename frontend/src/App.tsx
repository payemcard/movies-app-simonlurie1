import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import MovieDetailsWrapper from './components/MovieDetails/MovieDetailsWrapper';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie Collection</h1>
        </header>
        <main>
          <MovieDetailsWrapper />
          <Routes>
            <Route path="/" element={<MovieList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
