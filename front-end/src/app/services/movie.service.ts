import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie, SearchRequest, SearchResponse } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  searchMovies(keywords: string[], limit?: string): Observable<Movie[]> {
    const searchRequest: SearchRequest = {
      keywords,
      limit
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Movie[]>(`${this.apiUrl}/movies/search`, searchRequest, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getScenesByKeywords(keywords: string[]): Observable<any[]> {
    const keywordsParam = keywords.join(',');
    return this.http.get<any[]>(`${this.apiUrl}/scenes/search?keywords=${keywordsParam}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getScenesByMovieId(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/scenes/movie/${movieId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Movie service error:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}