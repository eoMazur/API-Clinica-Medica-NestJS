import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { ParamId } from '../decorators/param-id.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { PaginacaoDto } from '../paginacao/paginacao.dto';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('consultas')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  @Roles(Role.Admin, Role.Recepcionista)
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Recepcionista)
  findAll(@Query() paginacao: PaginacaoDto) {
    return this.consultaService.findAll(paginacao);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  findOne(@ParamId() id: number) {
    return this.consultaService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  update(@ParamId() id: number, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultaService.update(+id, updateConsultaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Recepcionista)
  remove(@ParamId() id: number) {
    return this.consultaService.remove(+id);
  }
}
