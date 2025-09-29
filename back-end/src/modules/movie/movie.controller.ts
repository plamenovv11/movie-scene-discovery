import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { SearchScenesDto } from '../../dto/search-scenes.dto';
import { MovieResponseDto } from '../../dto/movie-response.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('search')
  @ApiOperation({ summary: 'Search for movies with specific fighting scenes' })
  @ApiResponse({
    status: 200,
    description: 'Movies with relevant scenes found',
    type: [MovieResponseDto],
  })
  async searchMoviesByKeywords(@Body() searchDto: SearchScenesDto): Promise<MovieResponseDto[]> {
    console.log('🔍 Backend: Received search request:', searchDto);
    const movies = await this.movieService.searchMoviesByKeywords(searchDto.keywords);
    console.log('📊 Backend: Found movies:', movies.length);
    
    const response = movies.map(movie => this.mapToResponseDto(movie));
    console.log('📤 Backend: Sending response:', JSON.stringify(response, null, 2));
    
    return response;
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({
    status: 200,
    description: 'List of all movies',
    type: [MovieResponseDto],
  })
  async findAllMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieService.findAllMovies();
    return movies.map(movie => this.mapToResponseDto(movie));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie details',
    type: MovieResponseDto,
  })
  async findMovieById(@Param('id') id: string): Promise<MovieResponseDto> {
    const movie = await this.movieService.findMovieById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return this.mapToResponseDto(movie);
  }

  private mapToResponseDto(movie: any): MovieResponseDto {
    return {
      id: movie.id,
      tmdbId: movie.tmdbId,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.releaseDate,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      genres: movie.genres,
      youtubeTrailerId: movie.youtubeTrailerId,
      youtubeTrailerUrl: movie.youtubeTrailerUrl,
      scenes: movie.scenes?.map(scene => ({
        id: scene.id,
        description: scene.description,
        keywords: scene.keywords,
        tags: scene.tags,
        confidence: scene.confidence,
        timestamp: scene.timestamp,
        youtubeClipId: scene.youtubeClipId,
        youtubeClipUrl: scene.youtubeClipUrl,
      })) || [],
    };
  }
}

