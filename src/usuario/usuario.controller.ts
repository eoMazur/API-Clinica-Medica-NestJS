import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards, Query, UsePipes } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaginacaoDto } from '../paginacao/paginacao.dto';


@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Roles(Role.Admin, Role.Recepcionista)
  @Get()
  findAll(@Query() paginacao: PaginacaoDto) {
    return this.usuarioService.findAll(paginacao);
  }

  @Roles(Role.Admin, Role.Paciente)
  @Get(':id')
  findOne(@ParamId() id: Number) {
    return this.usuarioService.findOne(+id);
  }

  @Roles(Role.Admin, Role.Paciente)
  @Patch(':id')
  update(@ParamId() id: Number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Roles(Role.Admin, Role.Paciente)
  @Delete(':id')
  remove(@ParamId() id: Number) {
    return this.usuarioService.remove(+id);
  }
}
