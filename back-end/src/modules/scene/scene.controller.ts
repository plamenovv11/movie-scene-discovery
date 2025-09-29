import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SceneService } from './scene.service';
import { SceneResponseDto } from '../../dto/movie-response.dto';

@ApiTags('scenes')
@Controller('scenes')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Get()
  @ApiOperation({ summary: 'Get all scenes' })
  @ApiResponse({
    status: 200,
    description: 'List of all scenes',
    type: [SceneResponseDto],
  })
  async findAllScenes(): Promise<SceneResponseDto[]> {
    const scenes = await this.sceneService.findAllScenes();
    return scenes.map(scene => this.mapToResponseDto(scene));
  }

  @Get('search')
  @ApiOperation({ summary: 'Search scenes by keywords' })
  @ApiResponse({
    status: 200,
    description: 'Scenes matching keywords',
    type: [SceneResponseDto],
  })
  async findScenesByKeywords(@Query('keywords') keywords: string): Promise<SceneResponseDto[]> {
    const keywordArray = keywords.split(',').map(k => k.trim());
    const scenes = await this.sceneService.findScenesByKeywords(keywordArray);
    return scenes.map(scene => this.mapToResponseDto(scene));
  }

  @Get('movie/:movieId')
  @ApiOperation({ summary: 'Get scenes by movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Scenes for the specified movie',
    type: [SceneResponseDto],
  })
  async findScenesByMovieId(@Param('movieId') movieId: string): Promise<SceneResponseDto[]> {
    const scenes = await this.sceneService.findScenesByMovieId(movieId);
    return scenes.map(scene => this.mapToResponseDto(scene));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get scene by ID' })
  @ApiResponse({
    status: 200,
    description: 'Scene details',
    type: SceneResponseDto,
  })
  async findSceneById(@Param('id') id: string): Promise<SceneResponseDto> {
    const scene = await this.sceneService.findSceneById(id);
    if (!scene) {
      throw new Error('Scene not found');
    }
    return this.mapToResponseDto(scene);
  }

  private mapToResponseDto(scene: any): SceneResponseDto {
    return {
      id: scene.id,
      description: scene.description,
      keywords: scene.keywords,
      tags: scene.tags,
      confidence: scene.confidence,
      timestamp: scene.timestamp,
      youtubeClipId: scene.youtubeClipId,
      youtubeClipUrl: scene.youtubeClipUrl,
    };
  }
}

