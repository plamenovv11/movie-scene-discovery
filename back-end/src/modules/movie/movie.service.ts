import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Movie } from '../../entities/movie.entity';
import { AiService } from '../ai/ai.service';
import axios from 'axios';

@Injectable()
export class MovieService {
  private readonly tmdbApiKey: string;
  private readonly tmdbBaseUrl = 'https://api.themoviedb.org/3';
  private readonly youtubeApiKey: string;

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private configService: ConfigService,
    private aiService: AiService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
    this.youtubeApiKey = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  async searchMoviesByKeywords(keywords: string[]): Promise<Movie[]> {
    try {
      // Use AI to enhance keywords and get movie suggestions
      let aiAnalysis;
      try {
        aiAnalysis = await this.aiService.analyzeSceneKeywords(keywords);
        console.log('AI analysis completed successfully');
      } catch (error) {
        aiAnalysis = {
          enhancedKeywords: keywords,
          movieSuggestions: [],
          confidence: 0.5,
        };
      }
      
      const allKeywords = [...keywords, ...aiAnalysis.enhancedKeywords];
      const movieTitles = aiAnalysis.movieSuggestions;

      const foundMovies: Movie[] = [];

      for (const title of movieTitles) {
        try {
          const movie = await this.searchMovieByTitle(title);
          if (movie) {
            foundMovies.push(movie);
            console.log(`Found AI-suggested movie: ${movie.title}`);
          }
        } catch (error) {
          console.error(`Error searching for AI-suggested movie "${title}":`, error);
        }
      }

      // Search TMDB by keywords
      const tmdbMovies = await this.searchTmdbByKeywords(allKeywords);
      for (const tmdbMovie of tmdbMovies) {
        const existingMovie = foundMovies.find(m => m.tmdbId === tmdbMovie.id);
        if (!existingMovie) {
          try {
            const movie = await this.saveFoundTMDBMovies(tmdbMovie);
            foundMovies.push(movie);
          } catch (error) {
            console.error(`Error creating movie from TMDB data:`, error);
          }
        }
      }
      return foundMovies;
    } catch (error) {
      console.error('Error searching movies by keywords:', error);
      return [];
    }
  }

  private async searchMovieByTitle(title: string): Promise<Movie | null> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/search/movie`, {
        params: {
          api_key: this.tmdbApiKey,
          query: title,
          page: 1,
        },
      });

      const movies = response.data.results;
      if (movies && movies.length > 0) {
        return this.saveFoundTMDBMovies(movies[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error searching for movie: ${title}`, error);
      return null;
    }
  }

  private async searchTmdbByKeywords(keywords: string[]): Promise<any[]> {
    try {
      const allMovies: any[] = [];
      
      for (const keyword of keywords) {
        const response = await axios.get(`${this.tmdbBaseUrl}/search/movie`, {
          params: {
            api_key: this.tmdbApiKey,
            query: keyword,
            page: 1,
          },
        });

        if (response.data.results) {
          allMovies.push(...response.data.results.slice(0, 5)); // Limit to 5 per keyword
        }
      }

      // Remove duplicates and sort by popularity
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      );

      return uniqueMovies.sort((a, b) => b.popularity - a.popularity);
    } catch (error) {
      console.error('Error searching TMDB by keywords:', error);
      return [];
    }
  }

  private async saveFoundTMDBMovies(tmdbMovie: any): Promise<Movie> {
    // Check if movie already exists
    let movie = await this.movieRepository.findOne({
      where: { tmdbId: tmdbMovie.id },
    });

    if (!movie) {
      movie = this.movieRepository.create({
        tmdbId: tmdbMovie.id,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        releaseDate: tmdbMovie.release_date,
        posterPath: tmdbMovie.poster_path,
        backdropPath: tmdbMovie.backdrop_path,
        voteAverage: tmdbMovie.vote_average,
        voteCount: tmdbMovie.vote_count,
        genres: [], // Will be populated from detailed movie info
      });

      movie = await this.movieRepository.save(movie);
      
      // Get detailed movie info including genres
      await this.enrichMovieDetails(movie);
    }

    // Always check for trailer (for both new and existing movies)
    if (!movie.youtubeTrailerId) {
      console.log(`Searching for trailer for: ${movie.title}`);
      await this.findAndSetTrailer(movie);
    } else {
      console.log(`Trailer already exists for: ${movie.title}`);
    }

    return movie;
  }

  private async enrichMovieDetails(movie: Movie): Promise<void> {
    try {
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/${movie.tmdbId}`, {
        params: {
          api_key: this.tmdbApiKey,
        },
      });

      const movieDetails = response.data;
      movie.genres = movieDetails.genres?.map(genre => genre.name) || [];
      
      await this.movieRepository.save(movie);
    } catch (error) {
      console.error('Error enriching movie details:', error);
    }
  }

  private async findAndSetTrailer(movie: Movie): Promise<void> {
    try {
      console.log(`Fetching videos for movie: ${movie.title} (TMDB ID: ${movie.tmdbId})`);
      const response = await axios.get(`${this.tmdbBaseUrl}/movie/${movie.tmdbId}/videos`, {
        params: {
          api_key: this.tmdbApiKey,
        },
      });

      const videos = response.data.results;
      console.log(`Found ${videos?.length || 0} videos for ${movie.title}`);
      
      const trailer = videos?.find(video => 
        video.type === 'Trailer' && 
        video.site === 'YouTube' &&
        video.official
      );

      if (trailer) {
        movie.youtubeTrailerId = trailer.key;
        movie.youtubeTrailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        await this.movieRepository.save(movie);
        console.log(`✓ Found trailer for ${movie.title}: ${movie.youtubeTrailerUrl}`);
      } else {
        console.log(`✗ No official YouTube trailer found for ${movie.title}`);
      }
    } catch (error) {
      console.error(`Error finding trailer for ${movie.title}:`, error);
    }
  }


  async findMovieById(id: string): Promise<Movie | null> {
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async searchMoviesByTitle(title: string): Promise<Movie[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .where('LOWER(movie.title) LIKE LOWER(:title)', { title: `%${title}%` })
      .orderBy('movie.createdAt', 'DESC')
      .getMany();
  }
}
