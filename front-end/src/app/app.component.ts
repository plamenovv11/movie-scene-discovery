import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from './interfaces/movie.interface';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { SidenavLayoutComponent } from './components/sidenav-layout/sidenav-layout.component';
import { MovieDetailsModalComponent } from './components/movie-details-modal/movie-details-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SearchComponent,
    ResultsComponent,
    SidenavLayoutComponent,
    MovieDetailsModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies: Movie[] = [];
  isLoading = false;
  selectedMovie: Movie | null = null;
  showMovieModal = false;

  onSearchResults(movies: Movie[]): void {
    this.movies = movies;
  }

  onSearchLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  onMovieSelected(movie: Movie): void {
    this.selectedMovie = movie;
    this.showMovieModal = true;
  }

  onCloseMovieModal(): void {
    this.showMovieModal = false;
    this.selectedMovie = null;
  }
}