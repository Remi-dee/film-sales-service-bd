import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FilmService } from './films.service';
import { CreateFilmDto, UpdateFilmDto } from './dto/film.dto';
import { Film } from './schema/film.schema';

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({
    status: 201,
    description: 'The film has been created.',
    type: Film,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return await this.filmService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all films' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of films',
    type: [Film],
  })
  async findAll(): Promise<Film[]> {
    return await this.filmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a film by ID' })
  @ApiResponse({
    status: 200,
    description: 'The film has been found',
    type: Film,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async findOne(@Param('id') id: string): Promise<Film> {
    return await this.filmService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a film by ID' })
  @ApiResponse({
    status: 200,
    description: 'The film has been updated',
    type: Film,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<Film> {
    return await this.filmService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiResponse({
    status: 200,
    description: 'The film has been deleted',
    type: Film,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async delete(@Param('id') id: string): Promise<Film> {
    return await this.filmService.delete(id);
  }
}
