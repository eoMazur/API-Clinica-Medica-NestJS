import { IsEmail, IsEnum, IsString, IsStrongPassword, MaxLength, MinLength, minLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUsuarioDto {

    @IsString()
    nome: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    senha: string;

    @IsEmail(undefined, {message: "O email deve ser válido"})
    email: string;

    @IsEnum(Role)
    cargo: number;

    @IsString()
    @MinLength(13)
    @MaxLength(13)
    telefone: string;

    @IsString()
    cidade: string;
}
