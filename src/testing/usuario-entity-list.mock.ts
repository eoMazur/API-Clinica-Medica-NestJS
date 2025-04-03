import { Usuario } from "@prisma/client";

export const usuarioList:Usuario[] = [{
        id: 1,
        nome: 'teste',
        cargo: 3,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        senha: '$2b$10$nlLNad5mHMbvq3311jO7Zulm.lVf/A18g7bz1FOxH2R8maFBJFH66',
        telefone: '42999999999'
    },
    {
        id: 2,
        nome: 'teste',
        cargo: 2,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        senha: '$2b$10$nlLNad5mHMbvq3311jO7Zulm.lVf/A18g7bz1FOxH2R8maFBJFH66',
        telefone: '42999999999'
    },
    {
        id: 3,
        nome: 'teste',
        cargo: 1,
        cidade: 'Cruz Machado',
        email: 'email@email.com',
        senha: '$2b$10$nlLNad5mHMbvq3311jO7Zulm.lVf/A18g7bz1FOxH2R8maFBJFH66',
        telefone: '42999999999'
    },
    {
        id: 1,
        nome: 'nome Atualizado',
        cargo: 3,
        cidade: 'Cidade atualizada',
        email: 'EmailAtualizado@email.com',
        telefone: '428888888',
        senha: '$2b$10$nlLNad5mHMbvq3311jO7Zulm.lVf/A18g7bz1FOxH2R8maFBJFH66',
    }];