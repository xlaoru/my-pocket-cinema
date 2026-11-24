import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Movie } from '../models/movie';
import { ListItem, ListStatus } from '../models/my-list';
import { map, Observable, tap } from 'rxjs';
import { resourceStatus } from './resource-status';
import { MovieService } from './movie';

@Service()
export class MyListService {
    private readonly http = inject(HttpClient)
    private readonly movieService = inject(MovieService)

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
        const request$ = movie.status === null
            ? this.http.post<ListItem>('/api/my-list', {
                movieId: movie.id,
                status: changes.status,
                ...(changes.rating !== undefined && { rating: changes.rating })
            })
            : this.http.patch<ListItem>(`/api/my-list/${movie.id}`, changes)

        return request$.pipe(tap(item => this.syncSaved(item)))
    }

    remove(movie: Movie): Observable<Movie> {
        const removed: Movie = { ...movie, status: null, myRating: null }

        return this.http.delete<void>(`/api/my-list/${movie.id}`).pipe(
            map(() => removed),
            tap(() => this.syncRemoved(removed))
        )
    }

    toggleSaved(movie: Movie): Observable<Movie> {
        return movie.status === "saved"
            ? this.remove(movie)
            : this.save(movie, { status: "saved" }).pipe((map(item => item.movie)))
    }

    /* ==== Cache sync ==== */

    private syncSaved(item: ListItem) {
        this.movieService.patchMovie(item.movie)
        this.movieService.markRecommendationStale()

        if (!this.listResource.hasValue()) {
            return
        }

        this.listResource.update(items => {
            const rest = items.filter(i => i.movie.id !== item.movie.id)

            if (item.status !== this.listStatus()) {
                return rest
            }

            const exists = rest.length !== items.length

            return exists
                ? items.map(i => i.movie.id === item.movie.id ? item : i)
                : [item, ...items]
        })
    }

    private syncRemoved(movie: Movie) {
        this.movieService.patchMovie(movie)
        this.movieService.markRecommendationStale()

        if (this.listResource.hasValue()) {
            this.listResource.update(items => items.filter(i => i.movie.id !== movie.id))
        }
    }
}
