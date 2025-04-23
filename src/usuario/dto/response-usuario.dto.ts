import { Usuario } from "@prisma/client";
import { Exclude } from "class-transformer";

export class ResponseUsuarioDto{
    id: number;
    nome: string;
    email: string;
    cargo: number;
    telefone: string;
    cidade: string;

    @Exclude()
    senha: string;
}