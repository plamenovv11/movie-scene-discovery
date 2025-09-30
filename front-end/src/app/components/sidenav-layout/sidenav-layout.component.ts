import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-sidenav-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sidenav-layout.component.html',
  styleUrl: './sidenav-layout.component.scss'
})
export class SidenavLayoutComponent implements OnInit {
  @Output() movieSelected = new EventEmitter<Movie>();
  
  activeTab = 'search';
  titleFilter = '';
  previouslySearchedMovies: Movie[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load previously searched movies on init
    this.loadPreviouslySearchedMovies();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'previously-searched') {
      this.loadPreviouslySearchedMovies();
    }
  }

  onFilterChange() {
    // Debounce the filter change
    setTimeout(() => {
      this.loadPreviouslySearchedMovies();
    }, 500);
  }

  loadPreviouslySearchedMovies() {
    this.isLoading = true;
    
    // Build API URL with optional title filter
    let apiUrl = 'http://localhost:3000/movies';
    if (this.titleFilter.trim()) {
      apiUrl += `?title=${encodeURIComponent(this.titleFilter.trim())}`;
    }

    this.http.get<Movie[]>(apiUrl).subscribe({
      next: (movies) => {
        this.previouslySearchedMovies = movies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading previously searched movies:', error);
        this.previouslySearchedMovies = [];
        this.isLoading = false;
      }
    });
  }

  selectMovie(movie: Movie) {
    this.movieSelected.emit(movie);
  }

  getPosterUrl(posterPath: string | undefined): string {
    if (!posterPath) return 'assets/no-poster.jpg';
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  }

  formatReleaseDate(releaseDate: string | undefined): string {
    if (!releaseDate) return 'Unknown';
    const date = new Date(releaseDate);
    return date.getFullYear().toString();
  }

  getFormattedRating(voteAverage: number | string | undefined): string {
    if (!voteAverage) return 'N/A';
    
    const rating = typeof voteAverage === 'number' ? voteAverage : parseFloat(voteAverage);
    
    if (isNaN(rating)) return 'N/A';
    
    return rating.toFixed(1);
  }
}