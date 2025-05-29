const fs = require('fs');
const dbPath = './db.json';

function loadMovies() {
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveMovies(movies) {
    fs.writeFileSync(dbPath, JSON.stringify(movies, null, 2));
}

module.exports = {
    loadMovies,
    saveMovies
};
