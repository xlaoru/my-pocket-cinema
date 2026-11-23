import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Movie } from '../models/movie';
import { ListItem, ListStatus } from '../models/my-list';
import { map, Observable } from 'rxjs';
import { resourceStatus } from './resource-status';

@Service()
export class MyListService {
    private readonly http = inject(HttpClient)

    /* ==== Inputs ==== */

    readonly listStatus = signal<ListStatus | undefined>(undefined)

    /* ==== Resources ==== */

    private listResource = httpResource<ListItem[]>(() => {
        const status = this.listStatus()
        return status ? `/api/my-list?status=${status}` : undefined
    })

    /* ==== Public state ==== */

    readonly list = {
        items: computed(() => this.listResource.hasValue() ? this.listResource.value() : []),
        ...resourceStatus(this.listResource)
    }

    /* ==== Mutations ==== */

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
