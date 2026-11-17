import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';
import { Movie } from '../models/movie';

@Service()
export class MovieService {
    private movieResource = httpResource<Movie[]>(() => "/api/movies", {
        defaultValue: []
    })

    readonly allMovies = this.movieResource.value
    readonly allMoviesLoading = this.movieResource.isLoading
    readonly allMoviesError = this.movieResource.error

    reloadMovies() {
        this.movieResource.reload()
    }
}
