import { Component, effect, inject, input } from '@angular/core';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie';

@Component({
  imports: [Loader, Button, MovieCard, RouterLink],
  selector: 'app-movie-details',
  styleUrl: './movie-details.css',
  templateUrl: './movie-details.html',
})
export class MovieDetails {
  private readonly router = inject(Router)

  readonly id = input.required<string>()
  readonly movieService = inject(MovieService)

  backToHome () {
    this.router.navigate(['/'])
  }

  constructor () {
    effect(() => {
      this.movieService.movieId.set(this.id())
    })
  }
}
