import { HttpResourceRef, httpResource } from '@angular/common/http';
import { Service, computed, signal } from '@angular/core';
import { Movie, RecommendationsResponse, TopPickResponse } from '../models/movie';

function status(ref: HttpResourceRef<unknown>) {
    return {
        loading: ref.isLoading,
        error: ref.error,
        reload: () => ref.reload(),
    }
}

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
        ...status(this.searchResource),
    }

    readonly recommendations = {
        movies: computed(() => this.recommendationsResource.hasValue() ? this.recommendationsResource.value().movies : []),
        source: computed(() => this.recommendationsResource.hasValue() ? this.recommendationsResource.value().source : null),
        ...status(this.recommendationsResource),
    }

    readonly topPick = {
        movie: computed(() => this.topPickResource.hasValue() ? this.topPickResource.value().movie : null),
        source: computed(() => this.topPickResource.hasValue() ? this.topPickResource.value().source : null),
        ...status(this.topPickResource),
    }

    readonly movie = {
        movie: computed(() => this.movieResource.hasValue() ? this.movieResource.value() : null),
        ...status(this.movieResource),
    }

    readonly similar = {
        movies: computed(() => this.similarResource.hasValue() ? this.similarResource.value() : []),
        ...status(this.similarResource),
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

    setMovie(movie: Movie) {
        this.movieResource.set(movie)
    }
}
