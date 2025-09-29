import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Scene } from './scene.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tmdbId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  overview: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  backdropPath: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  voteAverage: number;

  @Column({ type: 'int', nullable: true })
  voteCount: number;

  @Column({ type: 'text', array: true, default: [] })
  genres: string[];

  @Column({ nullable: true })
  youtubeTrailerId: string;

  @Column({ nullable: true })
  youtubeTrailerUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Scene, scene => scene.movie)
  scenes: Scene[];
}
