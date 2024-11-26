import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsUrl, IsNumber } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({ description: 'The title of the film' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the film', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The genre of the film' })
  @IsString()
  genre: string;

  @ApiProperty({ description: 'The price of the film' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Release date of the film' })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: "URL for the film's poster image",
    required: false,
  })
  @IsUrl()
  @IsOptional()
  posterUrl?: string;
}

export class UpdateFilmDto {
  @ApiProperty({ description: 'The title of the film', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the film', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The genre of the film', required: false })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiProperty({ description: 'Release date of the film', required: false })
  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @ApiProperty({
    description: "URL for the film's poster image",
    required: false,
  })
  @IsUrl()
  @IsOptional()
  posterUrl?: string;
}
