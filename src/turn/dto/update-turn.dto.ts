import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StatusTurn } from 'src/shared/enums/status-turn.enum';

export class UpdateTurnDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsString()
  @IsNotEmpty()
  estado_turno: StatusTurn;

  @IsNumber()
  @IsNotEmpty()
  numero_turno: number;
}
