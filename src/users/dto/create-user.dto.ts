import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/shared/enums/roles.enum";

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  role: Role;
}
