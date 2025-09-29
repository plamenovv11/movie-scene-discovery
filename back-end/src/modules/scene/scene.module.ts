import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SceneService } from './scene.service';
import { SceneController } from './scene.controller';
import { Scene } from '../../entities/scene.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scene])],
  controllers: [SceneController],
  providers: [SceneService],
  exports: [SceneService],
})
export class SceneModule {}

