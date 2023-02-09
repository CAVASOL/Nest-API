import { Module } from '@nestjs/common';
import { AnimalsModule } from './animals/animals.module';
import { AppController } from './app.controller';
@Module({
  imports: [AnimalsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
