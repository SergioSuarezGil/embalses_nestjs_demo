import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmbalseDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  provincia: string;
}
