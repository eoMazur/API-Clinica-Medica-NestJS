import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TipoConsultaService } from './tipo-consulta.service';
import { CreateTipoConsultaDto } from './dto/create-tipo-consulta.dto';
import { UpdateTipoConsultaDto } from './dto/update-tipo-consulta.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { PaginacaoDto } from '../paginacao/paginacao.dto';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('tipoconsultas')
export class TipoConsultaController {
  constructor(private readonly tipoConsultaService: TipoConsultaService) {}

  @Post()
  @Roles(Role.Admin, Role.Recepcionista)
  create(@Body() createTipoConsultaDto: CreateTipoConsultaDto) {
    return this.tipoConsultaService.create(createTipoConsultaDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Recepcionista)
  findAll(@Query() paginacao: PaginacaoDto) {
    return this.tipoConsultaService.findAll(paginacao);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  findOne(@Param('id') id: string) {
    return this.tipoConsultaService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  update(@Param('id') id: string, @Body() updateTipoConsultaDto: UpdateTipoConsultaDto) {
    return this.tipoConsultaService.update(+id, updateTipoConsultaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  remove(@Param('id') id: string) {
    return this.tipoConsultaService.remove(+id);
  }
}
