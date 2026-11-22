import { Component, computed, input } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Button, RouterLink],
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  public movie = input.required<Movie>()
  
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
}
