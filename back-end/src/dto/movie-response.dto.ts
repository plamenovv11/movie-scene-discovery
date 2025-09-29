import { ApiProperty } from '@nestjs/swagger';

export class SceneResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  keywords: string[];

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  confidence: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  youtubeClipId: string;

  @ApiProperty()
  youtubeClipUrl: string;
}

export class MovieResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tmdbId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  releaseDate: string;

  @ApiProperty()
  posterPath: string;

  @ApiProperty()
  backdropPath: string;

  @ApiProperty()
  voteAverage: number;

  @ApiProperty()
  voteCount: number;

  @ApiProperty({ type: [String] })
  genres: string[];

  @ApiProperty()
  youtubeTrailerId: string;

  @ApiProperty()
  youtubeTrailerUrl: string;

  @ApiProperty({ type: [SceneResponseDto] })
  scenes: SceneResponseDto[];
}
