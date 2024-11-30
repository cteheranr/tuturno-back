import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/shared/enums/roles.enum';

export class UpdateUserDto {
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
  @IsString()
  status?: string;
}
