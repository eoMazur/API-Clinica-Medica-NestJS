import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreatePacienteDto {

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

    @IsEmail()
    email: string;

    @IsString()
    telefone: string;

    @IsString()
    cidade: string;
}
