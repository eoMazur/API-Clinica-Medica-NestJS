import { count } from "console";

export const prismaConsultaMock = {
    usuario: {
        findUnique: jest.fn(),
      },
    consulta: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
    tipoConsulta: {
        count: jest.fn()
    }
}