import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { RuntimePipe } from '../../shared/pipes/runtime-pipe';
import { MyListService } from '../../core/services/my-list';
import { ListItem, ListStatus } from '../../core/models/my-list';
import { Observable } from 'rxjs';

function ratingColor(rating: number | null | undefined) {
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
}

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

  private readonly myList = inject(MyListService)
  protected readonly saving = signal(false)

  protected movie = this.movieService.movie.movie
  protected similar = this.movieService.similar.movies

  protected readonly audienceColor = computed(() => ratingColor(this.movie()?.rating))
  protected readonly myRatingColor = computed(() => ratingColor(this.movie()?.myRating))

  backToHome () {
    this.router.navigate(['/'])
  }

  private persist(request$: Observable<ListItem>) {
    this.saving.set(true)

    request$.subscribe({
      next: (item) => this.movieService.patchMovie(item.movie),
      complete: () => this.saving.set(false),
      error: () => this.saving.set(false)
    })
  }

  setStatus(status: ListStatus) {
    const movie = this.movie()

    if (!movie || movie.status === status) {
      return
    }

    this.persist(this.myList.save(movie, { status }))
  }

  setRating(rating: number) {
    const movie = this.movie()

    if (!movie || !movie.status) {
      return
    }

    const next = movie.myRating === rating ? null : rating

    this.persist(this.myList.save(movie, { rating: next }))
  }

  removeFromList() {
    const movie = this.movie()

    if (!movie) {
      return
    }

    this.saving.set(true)

    this.myList.remove(movie.id).subscribe({
      next: () => this.movieService.patchMovie({ ...movie, status: null, myRating: null }),
      complete: () => this.saving.set(false),
      error: () => this.saving.set(false)
    })
  }

  constructor () {
    effect(() => {
      this.movieService.movieId.set(this.id())
    })
  }
}
