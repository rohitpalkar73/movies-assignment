import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../movies/movie-list/movie-list.component').then(m => m.MovieListComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('../movies/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent)
  }
];