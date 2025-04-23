import { Consulta } from "@prisma/client";

export const consultaList: Consulta[] = [{
    id: 1,
    data: new Date(),
    descricao: 'Descrição Padrão',
    idTipoConsulta: 1,
    pacienteId: 1
},
{
    id: 2,
    data: new Date(),
    descricao: 'Descrição Padrão',
    idTipoConsulta: 2,
    pacienteId: 2
}]