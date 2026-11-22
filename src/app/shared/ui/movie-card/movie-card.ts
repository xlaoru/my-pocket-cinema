import { Component, computed, inject, input, signal } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';
import { MyListService } from '../../../core/services/my-list';
import { MovieService } from '../../../core/services/movie';
import { finalize, map, Observable } from 'rxjs';

@Component({
  imports: [Button, RouterLink],
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  private readonly myList = inject(MyListService)
  private readonly movieService = inject(MovieService)
  
  public movie = input.required<Movie>()
  protected readonly saving = signal(false)
  
  public rateColor = computed(() => { 
    const rating = this.movie().rating

    if (rating >= 7) {
      return 'var(--success)'
    }

    if (rating >= 5) {
      return 'var(--warning)'
    }

    return 'var(--danger)'
  })

  protected readonly saveLabel = computed(() => {
    switch (this.movie().status) {
      case 'saved': return 'Saved ✓'
      case 'recommend': return 'Recommended'
      case 'dropped': return 'Dropped'
      default: return 'Save'
    }
  })

  protected readonly saveLocked = computed(() => {
    const status = this.movie().status
    return status !== null && status !== "saved"
  })

  toggleSave() {
    const movie = this.movie()

    if (this.saving() || this.saveLocked()) {
      return
    }

    const request$: Observable<Movie> = this.myList.toggleSaved(movie)

    this.saving.set(true)

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(updated => this.movieService.patchMovie(updated))
  }
}
