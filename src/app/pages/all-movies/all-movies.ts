import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  imports: [RouterLink, Loader, Button],
  selector: 'app-all-movies',
  styleUrl: './all-movies.css',
  templateUrl: './all-movies.html',
})
export class AllMovies {
  private readonly route = inject(ActivatedRoute)
  public movieService = inject(MovieService)
  public searchResults = this.movieService.searchResults

  private readonly movieFromUrl = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('movie') ?? '')),
    { initialValue: '' },
  )

  constructor() {
    effect(() => this.movieService.query.set(this.movieFromUrl()))
  }
}
