import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service'; 
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/auth.register.dto'; 
import { PaginacaoDto } from '../paginacao/paginacao.dto';

@Injectable()
export class UsuarioService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUsuarioDto: CreateUsuarioDto) {

    const salt = await bcrypt.genSalt();

    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, salt);
    
    return this.prisma.usuario.create({
      data:{
        nome: createUsuarioDto.nome,
        cidade: createUsuarioDto.cidade,
        email: createUsuarioDto.email,
        cargo: createUsuarioDto.cargo,
        senha: createUsuarioDto.senha,
        telefone: createUsuarioDto.telefone
      }
    });
  }

  async createPaciente(registerDto: RegisterDto){

    const salt = await bcrypt.genSalt();

    registerDto.senha = await bcrypt.hash(registerDto.senha, salt);

    return this.prisma.usuario.create({
      data:{
        nome: registerDto.nome,
        cidade: registerDto.cidade,
        email: registerDto.email,
        senha: registerDto.senha,
        telefone: registerDto.telefone
      }
    });
  }

  async findAll(paginacao: PaginacaoDto) {
    console.log(paginacao.limit);

    return this.prisma.usuario.findMany({
      take: Number(paginacao.limit) || 10,
      skip: Number(paginacao.offset) || 0,
      orderBy: {
        id: 'asc'
      }
    });
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

    await this.verificarUsuario(1);

    return this.prisma.usuario.update({
      data: {
        nome: updateUsuarioDto.nome,
        cidade: updateUsuarioDto.cidade,
        email: updateUsuarioDto.email,
        cargo: updateUsuarioDto.cargo,
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
      throw new NotFoundException(`Usuário com ${id} não existe`);
    }
  }
}
 