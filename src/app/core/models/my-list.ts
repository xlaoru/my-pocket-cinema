import { Movie } from "./movie";

export type ListStatus = 'recommend' | 'saved' | 'dropped';

export interface ListItem {
  movie: Movie
  status: ListStatus
  rating: number | null
  addedAt: string
}