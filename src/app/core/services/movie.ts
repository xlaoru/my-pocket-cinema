import { httpResource } from '@angular/common/http';
import { Service, computed, signal } from '@angular/core';
import { Movie, RecommendationsResponse, TopPickResponse } from '../models/movie';
import { resourceStatus } from "./resource-status"

@Service()
export class MovieService {
    /* ==== Inputs ==== */

    readonly searchQuery = signal("")
    readonly movieId = signal<string | undefined>(undefined)

    /* ==== Resources ==== */

    private searchResource = httpResource<Movie[]>(() => {
        const q = this.searchQuery()
        return q ? `/api/movies?search=${encodeURIComponent(q)}` : undefined
    })

    private recommendationsResource = httpResource<RecommendationsResponse>(
        () => "/api/recommendations"
    )

    private topPickResource = httpResource<TopPickResponse>(
        () => "/api/recommendations/top-pick"
    )

    private movieResource = httpResource<Movie>(() => {
        const id = this.movieId()
        return id ? `/api/movies/${id}` : undefined
    })

    private similarResource = httpResource<Movie[]>(() => {
        const id = this.movieId()
        return id ? `/api/movies/${id}/similar` : undefined
    })

    /* ==== Public state ==== */

    readonly search = {
        movies: computed(() => this.searchResource.hasValue() ? this.searchResource.value() : []),
        ...resourceStatus(this.searchResource),
    }

    readonly recommendations = {
        movies: computed(() => this.recommendationsResource.hasValue() ? this.recommendationsResource.value().movies : []),
        source: computed(() => this.recommendationsResource.hasValue() ? this.recommendationsResource.value().source : null),
        ...resourceStatus(this.recommendationsResource),
    }

    readonly topPick = {
        movie: computed(() => this.topPickResource.hasValue() ? this.topPickResource.value().movie : null),
        source: computed(() => this.topPickResource.hasValue() ? this.topPickResource.value().source : null),
        ...resourceStatus(this.topPickResource),
    }

    readonly movie = {
        movie: computed(() => this.movieResource.hasValue() ? this.movieResource.value() : null),
        ...resourceStatus(this.movieResource),
    }

    readonly similar = {
        movies: computed(() => this.similarResource.hasValue() ? this.similarResource.value() : []),
        ...resourceStatus(this.similarResource),
    }

    /* ==== Actions ==== */

    reloadRecommendations() {
        this.recommendations.reload()
        this.topPick.reload()
    }

    reloadMovieDetails() {
        this.movie.reload()
        this.similar.reload()
    }

    patchMovie(updated: Movie) {
        const replace = (m: Movie) => m.id === updated.id ? updated : m

        if (this.movieResource.hasValue()) {
            this.movieResource.update(m => m?.id === updated.id ? updated : m)
        }

        if (this.similarResource.hasValue()) {
            this.similarResource.update(list => list?.map(replace))
        }

        if (this.searchResource.hasValue()) {
            this.searchResource.update(list => list?.map(replace))
        }

        if (this.recommendationsResource.hasValue()) {
            this.recommendationsResource.update(r => r && { ...r, movies: r.movies.map(replace) })
        }

        if (this.topPickResource.hasValue()) {
            this.topPickResource.update(r => r?.movie?.id === updated.id ? { ...r, movie: updated } : r)
        }
    }
}
