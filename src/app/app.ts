import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './core/services/movie';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected movieService = inject(MovieService)
}
