import { Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';
import { MovieService } from './core/services/movie';
import { MyListService } from './core/services/my-list';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const movieService = inject(MovieService)
    const myList = inject(MyListService)
    const window = inject(DOCUMENT).defaultView

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        movieService.reloadAll()
        myList.list.reload()
      }
    }

    window?.addEventListener('pageshow', onPageShow)
    inject(DestroyRef).onDestroy(() => window?.removeEventListener('pageshow', onPageShow))
  }
}
