import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { Movie } from '../../core/models/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filtered: Movie[] = [];
  visibleMovies: Movie[] = [];
  searchText: string = '';
  batchSize = 10;
  currentIndex = 0;
  isLoading = false;
  colorPalette = [
    'var(--red)',
    'var(--orange)',
    'var(--green)',
    'var(--blue)',
    'var(--purple)',
  ];
  movieColorMap = new Map<string, string>();

  constructor(private movieService: MovieService, private el: ElementRef) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filterMovies();
    });
  }

  filterMovies() {
    this.filtered = this.movies.filter((movie) =>
      movie.Title.toString().toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentIndex = 0;
    this.visibleMovies = [];
    this.loadMore();
  }

  loadMore() {
    if (this.isLoading || this.currentIndex >= this.filtered.length) return;
    this.isLoading = true;
    const next = this.filtered.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );
    setTimeout(() => {
      next.forEach((movie) => {
        if (!this.movieColorMap.has(movie.Title)) {
          const randomColor =
            this.colorPalette[
              Math.floor(Math.random() * this.colorPalette.length)
            ];
          this.movieColorMap.set(movie.Title, randomColor);
        }
      });
      this.visibleMovies = [...this.visibleMovies, ...next];
      this.currentIndex += this.batchSize;
      this.isLoading = false;
    }, 300);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;
    if (scrollPosition >= threshold) {
      this.loadMore();
    }
    const scrollY = window.scrollY;
    const input = document.querySelector('.search-input') as HTMLElement;
    if (input) {
      if (scrollY > 10) {
        input.classList.add('transparent');
      } else {
        input.classList.remove('transparent');
      }
    }
  }

  getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colorPalette.length);
    return this.colorPalette[index];
  }

  getMovieImageURL(movie:any){
    return movie["Image URL"]
  }
  onImageError(event: Event) {
    (event.target as HTMLImageElement).style.backgroundColor = '#ffffff';
    (event.target as HTMLImageElement).src = '';
  }
}
