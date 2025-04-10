import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoConsultaDto } from './dto/create-tipo-consulta.dto';
import { UpdateTipoConsultaDto } from './dto/update-tipo-consulta.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginacaoDto } from '../paginacao/paginacao.dto';

@Injectable()
export class TipoConsultaService {
  constructor(private readonly prisma: PrismaService){}

  create(createTipoConsultaDto: CreateTipoConsultaDto) {
    return this.prisma.tipoConsulta.create({
      data: {
        nome: createTipoConsultaDto.nome,
        valor: createTipoConsultaDto.valor
      }
    });
  }

  findAll(paginacao: PaginacaoDto) {
    return this.prisma.tipoConsulta.findMany({
      take: Number(paginacao.limit) || 10,
      skip: Number(paginacao.offset) || 0,
      orderBy: {
        id: 'asc'
      }
    });
  }

  async findOne(id: number) {
    await this.verificarTipoConsulta(id);

    return this.prisma.tipoConsulta.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTipoConsultaDto: UpdateTipoConsultaDto) {

    await this.verificarTipoConsulta(id);

    return this.prisma.tipoConsulta.update({
      data: {
        nome: updateTipoConsultaDto.nome,
        valor: updateTipoConsultaDto.valor
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {

    await this.verificarTipoConsulta(id)

    return this.prisma.tipoConsulta.delete({
      where: {
        id
      }
    });
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
