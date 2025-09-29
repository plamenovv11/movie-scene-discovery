export interface Scene {
  id: string;
  description: string;
  keywords: string[];
  tags: string[];
  confidence: number;
  timestamp: string;
  youtubeClipId: string;
  youtubeClipUrl: string;
}

export interface Movie {
  id: string;
  tmdbId: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  voteAverage: number;
  voteCount: number;
  genres: string[];
  youtubeTrailerId: string;
  youtubeTrailerUrl: string;
  scenes: Scene[];
}

export interface SearchRequest {
  keywords: string[];
  limit?: string;
}

export interface SearchResponse {
  movies: Movie[];
  totalResults: number;
}

