import { Component, computed, effect, inject, input } from '@angular/core';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { RuntimePipe } from '../../shared/pipes/runtime-pipe';

@Component({
  imports: [Loader, Button, MovieCard, RouterLink, RuntimePipe],
  selector: 'app-movie-details',
  styleUrl: './movie-details.css',
  templateUrl: './movie-details.html',
})
export class MovieDetails {
  private readonly router = inject(Router)

  readonly id = input.required<string>()
  readonly movieService = inject(MovieService)

  protected movie = this.movieService.movie.movie
  protected similar = this.movieService.similar.movies

  public rateColor = computed(() => { 
    const rating = this.movie()?.rating

    if (!rating) {
      return
    }

    if (rating >= 7) {
      return 'var(--success)'
    }

    if (rating >= 5) {
      return 'var(--warning)'
    }

    return 'var(--danger)'
  })

  backToHome () {
    this.router.navigate(['/'])
  }

  constructor () {
    effect(() => {
      this.movieService.movieId.set(this.id())
    })
  }
}
