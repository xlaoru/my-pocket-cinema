import { Component, input } from '@angular/core';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';
import { MovieCard } from '../../shared/ui/movie-card/movie-card';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Loader, Button, MovieCard, RouterLink],
  selector: 'app-movie-details',
  styleUrl: './movie-details.css',
  templateUrl: './movie-details.html',
})
export class MovieDetails {
  readonly id = input.required<string>()

  // readonly movie = 
}
