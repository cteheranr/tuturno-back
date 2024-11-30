import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModuloDto {
  @IsString()
  @IsNotEmpty()
  
  name: string;

  @IsString()
  @IsOptional()
  id_usuario: string;

  @IsNumber()
  @IsNotEmpty()
  is_busy: number;
}
