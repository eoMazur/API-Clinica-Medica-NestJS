import { CreateConsultaDto } from "../../consulta/dto/create-consulta.dto";

export const createConsultaDto: CreateConsultaDto = {
    data: new Date(),
    descricao: 'Nova descrição',
    idTipoConsulta: 1,
    pacienteId: 1
}