import { PartialType } from '@nestjs/swagger';
import { CreateTurnConfigDto } from './create-turn-config.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTurnConfigDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  chart: string;

  @IsString()
  status?: string;
}
