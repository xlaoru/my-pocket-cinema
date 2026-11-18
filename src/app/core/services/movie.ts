import { httpResource } from '@angular/common/http';
import { Service, computed, signal } from '@angular/core';
import { Movie, RecommendationsResponse } from '../models/movie';

function recommendationsResource(url: () => string | undefined) {
    const resource = httpResource<RecommendationsResponse>(url, {
        defaultValue: { source: "popular", movies: [] }
    })

    return {
        movies: computed(() => resource.hasValue() ? resource.value().movies : []),
        source: computed(() => resource.hasValue() ? resource.value().source : null),
        loading: resource.isLoading,
        error: resource.error,
        reload: () => resource.reload(),
    }
}

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

    readonly recommendations = recommendationsResource(() => "/api/recommendations")

    readonly topPicks = recommendationsResource(
        () => `/api/recommendations/top-picks?limit=${1}`
    )

    reloadSearchResults() {
        this.searchResource.reload()
    }

    reloadRecommendations() {
        this.recommendations.reload()
        this.topPicks.reload()
    }
}
