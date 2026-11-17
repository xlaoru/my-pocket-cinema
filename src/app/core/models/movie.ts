export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  overview: string;
  posterUrl: string | null;
  rating: number;
  director: string;
}

export interface RecommendationsResponse {
  source: 'popular' | 'personal';
  movies: Movie[];
}
