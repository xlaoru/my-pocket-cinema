import { httpResource } from '@angular/common/http';
import { Service, computed, signal } from '@angular/core';
import { Movie, RecommendationsResponse } from '../models/movie';

@Service()
export class MovieService {
    readonly query = signal("")

    private searchResource = httpResource<Movie[]>(() => {
        const q = this.query()
        return q ? `/api/movies?search=${q}` : undefined
    }, { defaultValue: [] })

    readonly searchResults = this.searchResource.value
    readonly searchLoading = this.searchResource.isLoading
    readonly searchError = this.searchResource.error

    readonly recommendationResource = httpResource<RecommendationsResponse>(() => "/api/recommendations", {
        defaultValue: { source: "popular", movies: [] }
    })

    readonly recommendations = computed(() =>
        this.recommendationResource.hasValue() ? this.recommendationResource.value().movies : []
    )
    readonly recommendationsSource = computed(() =>
        this.recommendationResource.hasValue() ? this.recommendationResource.value().source : null
    )
    readonly recommendationsLoading = this.recommendationResource.isLoading
    readonly recommendationsError = this.recommendationResource.error

    reloadSearchResults() {
        this.searchResource.reload()
    }

    reloadRecommendations() {
        this.recommendationResource.reload()
    }
}
