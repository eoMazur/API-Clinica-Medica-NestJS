import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  //@UseInterceptors(LogInterceptor)
  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Number) {
    return this.pacienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: Number, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.update(+id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Number) {
    return this.pacienteService.remove(+id);
  }
}
