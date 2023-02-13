import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';

describe('AnimalsService', () => {
  let service: AnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return an animal', () => {
      service.create({
        name: 'Chichi',
        breeds: ['Poodle'],
        age: 10,
      });
      const animal = service.getOne(1);
      expect(animal).toBeDefined();
      expect(animal.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Animal with ID: 999 Not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete an animal', () => {
      service.create({
        name: 'Chichi',
        breeds: ['Poodle'],
        age: 10,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create an animal', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        name: 'Chichi',
        breeds: ['Poodle'],
        age: 10,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update an animal', () => {
      service.create({
        name: 'Chichi',
        breeds: ['Poodle'],
        age: 10,
      });
      service.update(1, { name: 'Updated Test' });
      const animal = service.getOne(1);
      expect(animal.name).toEqual('Updated Test');
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
