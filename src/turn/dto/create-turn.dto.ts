import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusTurn } from "src/shared/enums/status-turn.enum";

export class CreateTurnDto {
  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsString()
  @IsNotEmpty()
  estado_turno: StatusTurn;

  @IsString()
  @IsNotEmpty()
  tipo_turno: string;

  @IsNumber()
  numero_turno: number;
}
