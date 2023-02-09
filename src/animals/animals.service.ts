import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [];

  getAll(): Animal[] {
    return this.animals;
  }

  getOne(id: number): Animal {
    const animal = this.animals.find((animal) => animal.id === id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID: ${id} Not found.`);
    }
    return animal;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.animals = this.animals.filter((animal) => animal.id !== id);
  }

  create(animalData: CreateAnimalDto) {
    this.animals.push({
      id: this.animals.length + 1,
      ...animalData,
    });
  }

  update(id: number, updateData: UpdateAnimalDto) {
    const animal = this.getOne(id);
    this.deleteOne(id);
    this.animals.push({ ...animal, ...updateData });
  }
}
