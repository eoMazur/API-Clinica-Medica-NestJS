import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

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
