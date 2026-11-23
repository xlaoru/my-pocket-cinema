import { Route, Routes, UrlSegment } from '@angular/router';

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
        path: 'movies/:id',
        loadComponent: () => import('./pages/movie-details/movie-details').then(m => m.MovieDetails)
    },
    {
        path: 'my-list',
        redirectTo: 'my-list/recommended',
        pathMatch: 'full',
    },
    {
        path: 'my-list/:listType',
        loadComponent: () => import('./pages/my-list/my-list').then(m => m.MyList),
        canMatch: [
            (_route: Route, segments: UrlSegment[]) =>
                ['recommended', 'saved', 'dropped'].includes(segments[1].path)
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
