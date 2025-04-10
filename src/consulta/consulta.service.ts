import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginacaoDto } from '../paginacao/paginacao.dto';

@Injectable()
export class ConsultaService {

  constructor(private readonly prisma: PrismaService){}

  async create(createConsultaDto: CreateConsultaDto) {

    await this.verificarPaciente(createConsultaDto.pacienteId);
    await this.verificarTipoConsulta(createConsultaDto.idTipoConsulta);

    return this.prisma.consulta.create({
      data: {
        idTipoConsulta: createConsultaDto.idTipoConsulta,
        pacienteId: createConsultaDto.pacienteId,
        descricao: createConsultaDto.descricao,
        data: createConsultaDto.data
      }
    });
  }

  findAll(paginacao: PaginacaoDto) {
    return this.prisma.consulta.findMany({
      take: Number(paginacao.limit) || 10,
      skip: Number(paginacao.offset) || 0,
      orderBy: {
        id: 'asc'
      }
    });
  }

  async findOne(id: number) {

    await this.verificarConsulta(id);

    return this.prisma.consulta.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateConsultaDto: UpdateConsultaDto) {

    await this.verificarConsulta(id);

    return this.prisma.consulta.update({
      data: {
        data: updateConsultaDto.data,
        idTipoConsulta: updateConsultaDto.idTipoConsulta,
        pacienteId: updateConsultaDto.pacienteId,
        descricao: updateConsultaDto.descricao
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    await this.verificarConsulta(id);

    return this.prisma.consulta.delete({
      where: {
        id
      }
    });
  }

  private async verificarConsulta(id: number){
      if(!(await this.prisma.consulta.count({
        where: {
          id
        }
      }))){
        throw new NotFoundException(`Consulta com ${id} não existe`);
      }
  }

  private async verificarPaciente(id: number){

     const paciente = await this.prisma.usuario.findUnique({
      where: {
        id
      }
    });

    if(!(paciente)){
      throw new NotFoundException(`Paciente com ${id} não existe`);
    }

    if(paciente.cargo != 1){
      throw new BadRequestException(`O usuário deve possuir cargo de paciente!`);
    }
  }

  private async verificarTipoConsulta(id: number){
    if(!(await this.prisma.tipoConsulta.count({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`Esse tipo de consulta com ${id} não existe`);
    }
  }

}
