import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../interfaces/movie.interface';
import { MovieDetailsModalComponent } from '../movie-details-modal/movie-details-modal.component';

@Component({
  selector: 'app-results',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MovieDetailsModalComponent
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() movies: Movie[] = [];
  @Input() isLoading = false;

  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;

  constructor() { }

  ngOnInit(): void {
    this.filteredMovies = this.movies;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      this.filteredMovies = this.movies;
      this.selectedMovie = null;
    }
  }

  onMovieSelect(movie: Movie): void {
    console.log('onMovieSelect called with movie:', movie);
    this.selectedMovie = movie;
  }

  onCloseDetails(): void {
    this.selectedMovie = null;
  }

  getPosterUrl(posterPath: string | undefined): string {
    if (!posterPath) return 'assets/no-poster.jpg';
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  formatReleaseDate(releaseDate: string | undefined): string {
    if (!releaseDate) return 'Unknown';
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}