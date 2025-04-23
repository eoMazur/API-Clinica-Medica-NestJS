import { Usuario } from "@prisma/client";
import { ResponseUsuarioDto } from "../../usuario/dto/response-usuario.dto";

export const usuarioResponseList: any[] = [{
        id: 1,
        nome: 'teste',
        cargo: 3,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        telefone: '42999999999'
    },
    {
        id: 2,
        nome: 'teste',
        cargo: 2,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        telefone: '42999999999'
    },
    {
        id: 3,
        nome: 'teste',
        cargo: 1,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        telefone: '42999999999'
    },
    {
        id: 1,
        nome: 'nome Atualizado',
        cargo: 3,
        cidade: 'Cidade atualizada',
        email: 'EmailAtualizado@email.com',
        telefone: '428888888',
    }];