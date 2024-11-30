import { IsNumber, IsNotEmpty, IsString, IsDate, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Role } from 'src/shared/enums/roles.enum';

export class UpdatePersonalDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    first_name: string;

    @IsString()
    second_name?: string;

    @IsString()
    surname: string;

    @IsString()
    second_surname: string;

    @IsString()
    no_identification: string;

    @IsString()
    role: Role;
}

