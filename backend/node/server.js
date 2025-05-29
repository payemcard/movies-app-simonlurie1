const express = require('express');
const { loadMovies, saveMovies } = require('./dbUtils');

const app = express();
app.use(express.json());

app.get("/api/movies", (req, res) => {
    try {
        const movies = loadMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/movies/:id", (req, res) => {
    try {
        const movies = loadMovies();
        const movie = movies.find(m => m.id === parseInt(req.params.id));
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.put('/api/movies/:id', (req, res) => {
    try {
        const movies = loadMovies();
        const movie = movies.find(m => m.id === parseInt(req.params.id));
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        movie.watched = !movie.watched;  // Toggle the watched status
        saveMovies(movies);  // Save the updated movies
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
