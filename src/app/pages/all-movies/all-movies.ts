import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../../core/services/movie';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';

@Component({
  imports: [Loader, Button, MovieCard],
  selector: 'app-all-movies',
  styleUrl: './all-movies.css',
  templateUrl: './all-movies.html',
})
export class AllMovies {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly location = inject(Location)
  
  public movieService = inject(MovieService)

  private readonly movieFromUrl = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('query') ?? '')),
    { initialValue: '' },
  )

  constructor() {
    effect(() => this.movieService.searchQuery.set(this.movieFromUrl()))
  }

  backToHome () {
    this.router.navigate(['/'])
  }

  goBack () {
    if (history.state?.navigationId > 1) {
      this.location.back()
    } else {
      this.router.navigate(['/'])
    }
  }
}
