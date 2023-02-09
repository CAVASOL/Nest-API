import { IsNumber, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly breeds: string[];

  @IsNumber()
  readonly age: number;
}
