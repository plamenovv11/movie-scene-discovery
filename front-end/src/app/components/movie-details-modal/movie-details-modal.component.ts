import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    JsonPipe
  ],
  templateUrl: './movie-details-modal.component.html',
  styleUrl: './movie-details-modal.component.scss'
})
export class MovieDetailsModalComponent {
  @Input() movie: Movie | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  testValue = 'Template binding test';

  constructor(private cdr: ChangeDetectorRef) { }

  onClose(): void {
    this.close.emit();
  }

  playTrailer(): void {
    console.log('playTrailer called, movie:', this.movie);
    if (this.movie?.youtubeTrailerId) {
      console.log('Trailer ID found:', this.movie.youtubeTrailerId);
      // Force change detection first
      this.cdr.detectChanges();
      
      // Wait a bit for DOM to update, then scroll to the trailer section
      setTimeout(() => {
        const trailerSection = document.querySelector('.trailer-section');
        if (trailerSection) {
          console.log('Scrolling to trailer section');
          trailerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.log('Trailer section not found after timeout');
          // Try to find it again
          const trailerSection2 = document.querySelector('.trailer-section');
          console.log('Second attempt - trailer section found:', !!trailerSection2);
        }
      }, 100);
    } else {
      console.log('No trailer ID available - showing alert');
      alert('No trailer available for this movie');
    }
  }

  getYouTubeEmbedUrl(videoId: string | undefined): string {
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}`;
  }

  getYouTubeThumbnailUrl(videoId: string | undefined): string {
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  getPosterUrl(posterPath: string | undefined): string {
    if (!posterPath) return 'assets/no-poster.jpg';
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getBackdropUrl(backdropPath: string | undefined): string {
    if (!backdropPath) return '';
    return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
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

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.8) return '#4caf50';
    if (confidence >= 0.6) return '#ff9800';
    return '#f44336';
  }

  getConfidenceText(confidence: number): string {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  getFormattedRating(voteAverage: number | string | undefined): string {
    if (!voteAverage) return 'N/A';
    
    const rating = typeof voteAverage === 'number' ? voteAverage : parseFloat(voteAverage);
    
    if (isNaN(rating)) return 'N/A';
    
    return rating.toFixed(1);
  }
}
