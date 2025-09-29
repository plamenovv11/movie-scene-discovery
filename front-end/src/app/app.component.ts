import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from './interfaces/movie.interface';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SearchComponent,
    ResultsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies: Movie[] = [];
  isLoading = false;

  onSearchResults(movies: Movie[]): void {
    this.movies = movies;
  }

  onSearchLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}