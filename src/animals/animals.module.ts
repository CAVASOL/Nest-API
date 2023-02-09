import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

@Module({})
export class AnimalsModule {
  controllers: [AnimalsController];
  providers: [AnimalsService];
}
