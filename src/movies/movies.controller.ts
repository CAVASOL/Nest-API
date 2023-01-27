import { Controller, Get, Param } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `one movie with the id: ${movieId}`;
  }
}
