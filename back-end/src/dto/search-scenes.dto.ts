import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchScenesDto {
  @ApiProperty({
    description: 'Keywords to search for fighting scenes',
    example: 'karate, martial arts, combat',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  keywords: string[];

  @ApiProperty({
    description: 'Maximum number of results to return',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  limit?: string;
}
