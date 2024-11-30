import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateLoginDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
