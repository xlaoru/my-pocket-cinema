import { Component, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';

@Component({
  imports: [MovieCard, Loader, Button],
  selector: 'app-recommendations',
  styleUrl: './recommendations.css',
  templateUrl: './recommendations.html',
})
export class Recommendations {
  protected movieService = inject(MovieService)
  protected recommendations = this.movieService.recommendations.movies
  protected topPick = this.movieService.topPick.movie
}
