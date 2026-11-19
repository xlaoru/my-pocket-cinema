import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/recommendations/recommendations').then(m => m.Recommendations)
    },
    {
        path: 'movies',
        loadComponent: () => import('./pages/all-movies/all-movies').then(m => m.AllMovies)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
