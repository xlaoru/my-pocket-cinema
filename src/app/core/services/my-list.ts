import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Movie } from '../models/movie';
import { ListItem, ListStatus } from '../models/my-list';
import { map, Observable } from 'rxjs';

@Service()
export class MyListService {
    private readonly http = inject(HttpClient)

    save(movie: Movie, changes: { status?: ListStatus, rating?: number | null }): Observable<ListItem> {
        if (movie.status === null) {
            return this.http.post<ListItem>('/api/my-list', {
                movieId: movie.id,
                status: changes.status,
                ...(changes.rating !== undefined && { rating: changes.rating })
            })
        }

        return this.http.patch<ListItem>(`/api/my-list/${movie.id}`, changes)
    }

    remove(movieId: string): Observable<void> {
        return this.http.delete<void>(`/api/my-list/${movieId}`)
    }

    toggleSaved(movie: Movie): Observable<Movie> {
        return movie.status === "saved"
            ? this.remove(movie.id).pipe(map(() => ({ ...movie, status: null, myRating: null })))
            : this.save(movie, { status: "saved" }).pipe((map(item => item.movie)))
    }
}
