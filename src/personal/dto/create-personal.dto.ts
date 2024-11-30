import { IsNumber, IsNotEmpty, IsString, IsDate, MinLength, MaxLength, IsEmail, IsEmpty } from "class-validator";
import { Role } from "src/shared/enums/roles.enum";

export class CreatePersonalDto {
    @IsNumber()
    @IsNotEmpty()
    user_id?: number = 0;

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
