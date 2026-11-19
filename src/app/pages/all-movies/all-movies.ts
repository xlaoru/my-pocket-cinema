import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';

@Component({
  imports: [RouterLink, Loader, Button, MovieCard],
  selector: 'app-all-movies',
  styleUrl: './all-movies.css',
  templateUrl: './all-movies.html',
})
export class AllMovies {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  public movieService = inject(MovieService)
  public searchResults = this.movieService.searchResults

  private readonly movieFromUrl = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('query') ?? '')),
    { initialValue: '' },
  )

  constructor() {
    effect(() => this.movieService.query.set(this.movieFromUrl()))
  }

  backToHome () {
    this.router.navigate(['/'])
  }
}
