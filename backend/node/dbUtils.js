const fs = require('fs');
const dbPath = './db.json';

function loadMovies() {
    return JSON.parse(fs.readFileSync(dbPath));
}

module.exports = { loadMovies };
