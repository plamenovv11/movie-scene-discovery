import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchResults = new EventEmitter<Movie[]>();
  @Output() searchLoading = new EventEmitter<boolean>();

  searchForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    this.searchForm = this.fb.group({
      keywords: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const keywords = this.searchForm.get('keywords')?.value
        .split(',')
        .map((k: string) => k.trim())
        .filter((k: string) => k.length > 0);

      if (keywords.length > 0) {
        this.performSearch(keywords);
      }
    }
  }

  private performSearch(keywords: string[]): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.searchLoading.emit(true);

    this.movieService.searchMovies(keywords)
      .subscribe({
        next: (movies) => {
          this.searchResults.emit(movies);
          this.isLoading = false;
          this.searchLoading.emit(false);
        },
        error: (error) => {
          this.errorMessage = error.message || 'An error occurred while searching';
          this.isLoading = false;
          this.searchLoading.emit(false);
          console.error('Search error:', error);
        }
      });
  }

  onKeywordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Allow only letters, numbers, commas, and spaces
    const cleanValue = value.replace(/[^a-zA-Z0-9,\s]/g, '');
    
    if (cleanValue !== value) {
      input.value = cleanValue;
      this.searchForm.patchValue({ keywords: cleanValue });
    }
  }

  getErrorMessage(): string {
    const keywordsControl = this.searchForm.get('keywords');
    if (keywordsControl?.hasError('required')) {
      return 'Keywords are required';
    }
    if (keywordsControl?.hasError('minlength')) {
      return 'Please enter at least one keyword';
    }
    return '';
  }

  setExampleSearch(keywords: string): void {
    this.searchForm.patchValue({ keywords });
  }
}