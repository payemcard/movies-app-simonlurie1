export interface Movie {
  id: string;
  name: string;
  thumbnail: string;
  rating: number;
  genre: string;
  imdb_url: string;
  watched?: boolean;
}
