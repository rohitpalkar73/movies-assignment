import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/movies.json').pipe(
      map(movies => movies.sort((a, b) => b.Year - a.Year)),
      catchError(err => {
        console.error('Error loading movies', err);
        return of([]);
      })
    );
  }
}
