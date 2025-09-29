import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scene } from '../../entities/scene.entity';

@Injectable()
export class SceneService {
  constructor(
    @InjectRepository(Scene)
    private sceneRepository: Repository<Scene>,
  ) {}

  async findScenesByKeywords(keywords: string[]): Promise<Scene[]> {
    return this.sceneRepository
      .createQueryBuilder('scene')
      .leftJoinAndSelect('scene.movie', 'movie')
      .where('scene.keywords && :keywords', { keywords })
      .orderBy('scene.confidence', 'DESC')
      .getMany();
  }

  async findScenesByMovieId(movieId: string): Promise<Scene[]> {
    return this.sceneRepository.find({
      where: { movieId },
      relations: ['movie'],
      order: { confidence: 'DESC' },
    });
  }

  async findAllScenes(): Promise<Scene[]> {
    return this.sceneRepository.find({
      relations: ['movie'],
      order: { createdAt: 'DESC' },
    });
  }

  async findSceneById(id: string): Promise<Scene | null> {
    return this.sceneRepository.findOne({
      where: { id },
      relations: ['movie'],
    });
  }
}

