import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../core/models/movie';
import { MovieService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovies().subscribe((movies) => {
      this.movie = movies.find((m) => m.Title === title);
    });
  }

  getMovieImageURL(movie:any){
    return movie["Image URL"]
  }
}
