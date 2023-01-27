import { Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'All movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `One movie with id: ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  delete(@Param('id') movieId: string) {
    return `This will delete movie id: ${movieId}`;
  }

  @Patch('/:id')
  updateMovie(@Param('id') movieId: string) {
    return `Update a movie with the id: ${movieId}`;
  }
}
