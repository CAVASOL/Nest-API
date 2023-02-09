import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  @Get()
  getAll(): Animal[] {
    return this.animalsService.getAll();
  }

  // @Get('search')
  // search(@Query('name') searchingName: string) {
  //   return `We are searching for an animal with a name: ${searchingName} `;
  // }

  @Get(':id')
  getOne(@Param('id') animalId: number): Animal {
    console.log(typeof animalId);
    return this.animalsService.getOne(animalId);
  }

  @Post()
  create(@Body() animalData: CreateAnimalDto) {
    return this.animalsService.create(animalData);
  }

  @Delete(':id')
  removeAnimal(@Param('id') animalId: number) {
    return this.animalsService.deleteOne(animalId);
  }

  @Patch(':id')
  patch(@Param('id') animalId: number, @Body() updateData: UpdateAnimalDto) {
    return this.animalsService.update(animalId, updateData);
  }
}
