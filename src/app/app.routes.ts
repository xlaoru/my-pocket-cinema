import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/recommendations/recommendations').then(m => m.Recommendations)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
