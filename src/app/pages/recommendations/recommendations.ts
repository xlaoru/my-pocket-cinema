import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { Router } from '@angular/router';
import { MyListService } from '../../core/services/my-list';
import { finalize } from 'rxjs';
import { RuntimePipe } from '../../shared/pipes/runtime-pipe';

@Component({
  imports: [MovieCard, Loader, Button, RuntimePipe],
  selector: 'app-recommendations',
  styleUrl: './recommendations.css',
  templateUrl: './recommendations.html',
})
export class Recommendations {
  private readonly router = inject(Router)
  
  protected movieService = inject(MovieService)
  private readonly myList = inject(MyListService)

  protected recommendations = this.movieService.recommendations.movies
  protected topPick = this.movieService.topPick.movie

  protected readonly saving = signal(false)

  protected readonly saveLabel = computed(() => {
    switch (this.topPick()?.status) {
      case 'saved': return 'Saved ✓'
      case 'recommend': return 'Recommended'
      case 'dropped': return 'Dropped'
      default: return 'Save'
    }
  })

  protected readonly saveLocked = computed(() => {
    const status = this.topPick()?.status ?? null
    return status !== null && status !== "saved"
  })

  redirectToDetails() {
    this.router.navigate(['/movies', this.topPick()?.id])
  }

  toggleSave() {
    const movie = this.topPick()

    if (!movie || this.saving() || this.saveLocked()) {
      return
    }

    this.saving.set(true)

    this.myList.toggleSaved(movie)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(updated => this.movieService.patchMovie(updated))
  }
}
