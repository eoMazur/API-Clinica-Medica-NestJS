import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PacienteService {

  constructor(private readonly prisma: PrismaService){}

  async create(createPacienteDto: CreatePacienteDto) {
    
    return this.prisma.paciente.create({
      data:{
        nome: createPacienteDto.nome,
        cargo: "PACIENTE",
        cidade: createPacienteDto.cidade,
        email: createPacienteDto.email,
        senha: createPacienteDto.senha,
        telefone: createPacienteDto.telefone
      }
    });
  }

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    await this.verificarPaciente(id);

    return this.prisma.paciente.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return this.prisma.paciente.update({
      data: {
        nome: updatePacienteDto.nome,
        cidade: updatePacienteDto.cidade,
        email: updatePacienteDto.email,
        senha: updatePacienteDto.senha,
        telefone: updatePacienteDto.telefone
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {

    await this.verificarPaciente(id);

    return this.prisma.paciente.delete({
      where: {
        id: id
      }
    });
  }

  private async verificarPaciente(id: number){
    if(!(await this.prisma.paciente.count({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`Paciente com ${id} não existe`);
    }
  }
}
 