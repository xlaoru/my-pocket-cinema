export type ListStatus = 'recommend' | 'saved' | 'dropped';

export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  overview: string;
  posterUrl: string | null;
  rating: number;
  myRating: number | null;
  status: ListStatus | null;
  director: string;
}

export interface RecommendationsResponse {
  source: 'popular' | 'personal';
  movies: Movie[];
}

export interface TopPickResponse {
  source: 'popular' | 'personal';
  movie: Movie | null;
}
