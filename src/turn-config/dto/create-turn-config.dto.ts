import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTurnConfigDto {
  @IsNumber()
  @IsNotEmpty()
  id?: number = 0;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  chart: string;

  @IsString()
  status?: string;
}
