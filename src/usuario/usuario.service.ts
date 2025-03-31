import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    return this.prisma.usuario.create({
      data:{
        nome: createUsuarioDto.nome,
        cidade: createUsuarioDto.cidade,
        email: createUsuarioDto.email,
        senha: createUsuarioDto.senha,
        telefone: createUsuarioDto.telefone
      }
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    await this.verificarUsuario(id);

    return this.prisma.usuario.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      data: {
        nome: updateUsuarioDto.nome,
        cidade: updateUsuarioDto.cidade,
        email: updateUsuarioDto.email,
        senha: updateUsuarioDto.senha,
        telefone: updateUsuarioDto.telefone
      },
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {

    await this.verificarUsuario(id);

    return this.prisma.usuario.delete({
      where: {
        id: id
      }
    });
  }

  private async verificarUsuario(id: number){
    if(!(await this.prisma.usuario.count({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`Paciente com ${id} não existe`);
    }
  }
}
 