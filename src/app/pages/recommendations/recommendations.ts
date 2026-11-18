import { Component, computed, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';

@Component({
  imports: [MovieCard],
  selector: 'app-recommendations',
  styleUrl: './recommendations.css',
  templateUrl: './recommendations.html',
})
export class Recommendations {
  protected movieService = inject(MovieService)

  protected recommendations = computed(() => this.movieService.recommendations())
}
