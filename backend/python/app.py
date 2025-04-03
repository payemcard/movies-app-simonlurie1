from flask import Flask, jsonify, request
from flask_cors import CORS

from db_utils import load_movies

app = Flask(__name__)
CORS(app)

@app.route("/api/movies", methods=["GET"])
def get_movies():
    try:
        movies = load_movies()
        return jsonify(movies)
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500


@app.route("/api/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    try:
        movies = load_movies()
        movie = next((m for m in movies if m["id"] == movie_id), None)
        if not movie:
            return jsonify({"error": "Movie not found"}), 404
        return jsonify(movie)
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500


@app.route("/api/movies/<int:movie_id>", methods=["PUT"])
def update_movie(movie_id):
    # PUT request received. Implement logic here, ensuring that the watched status of the movie is updated.
    pass

if __name__ == "__main__":
    app.run(debug=True)
