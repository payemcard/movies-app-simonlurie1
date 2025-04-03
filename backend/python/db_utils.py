import json

def load_movies():
    with open("db.json", "r") as file:
        return json.load(file)

