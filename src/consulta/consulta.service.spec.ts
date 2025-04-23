import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaConsultaMock } from '../testing/consultas/prisma.consulta-service.mock';
import { consultaList } from '../testing/consultas/consulta-entity-list.mock';
import { usuarioList } from '../testing/usuarios/usuario-entity-list.mock';
import { createConsultaDto } from '../testing/consultas/create-consulta-dto.mock';
import { PaginacaoDto } from '../paginacao/paginacao.dto';
import { updateConsulta } from '../testing/consultas/update-consulta-dto.mock';

describe('ConsultaService', () => {

  let consultaService: ConsultaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultaService, {
        provide: PrismaService,
        useValue: prismaConsultaMock
      }],
    }).compile();

    consultaService = module.get(ConsultaService);
    prismaService = module.get(PrismaService);

    //consultaService = module.get<ConsultaService>(ConsultaService);
  });

  
  it('should be defined', () => {
    expect(consultaService).toBeDefined();
  });

  describe('create', () => {

    test('method create with valid data', async () => {
      prismaService.usuario.findUnique = jest.fn().mockResolvedValue(usuarioList[2]);
      prismaService.tipoConsulta.count = jest.fn().mockResolvedValue(1);
      prismaService.consulta.create = jest.fn().mockResolvedValue(consultaList[0]);

      const result = await consultaService.create(createConsultaDto);

      expect(result).toEqual(consultaList[0]);
    });

    test('method create without existing paciente', async () => {

      const result = await consultaService.create(createConsultaDto);

      expect(result).toThrow
    });

    test('method create without existing tipoConsulta', async () => {
      prismaService.usuario.findUnique = jest.fn().mockResolvedValue(usuarioList[2]);

      const result = await consultaService.create(createConsultaDto);

      expect(result).toThrow
    });
  });


  describe('read', () => {
    
    test('method read findAll with existing consultas', async () => {
      prismaService.consulta.findMany = jest.fn().mockResolvedValue(consultaList);

      const result = await consultaService.findAll(new PaginacaoDto());

      expect(result).toEqual(consultaList);
    });

    test('method read findAll without existing consultas', async () => {
      let consultas = [];
      prismaService.consulta.findMany = jest.fn().mockResolvedValue(consultas);

      const result = await consultaService.findAll(new PaginacaoDto());

      expect(result).toEqual(consultas);
    });

    test('method read findAll with existing consultas and paginacao', async () => {
      prismaService.consulta.findMany = jest.fn().mockResolvedValue(consultaList[1]);

      const paginacao: PaginacaoDto = {
        limit: 1,
        offset: 1
      }

      const result = await consultaService.findAll(paginacao);

      expect(result).toEqual(consultaList[1]);
    });


    test('method read findUnique with existing consulta', async () => {
      prismaService.consulta.count = jest.fn().mockResolvedValue(1);
      prismaService.consulta.findUnique = jest.fn().mockResolvedValue(consultaList[1]);

      const result = await consultaService.findOne(1);

      expect(result).toEqual(consultaList[1]);
    });

    test('method read findUnique without existing consulta', async () => {

      const result = await consultaService.findOne(1);

      expect(result).toThrow;
    });
  });

  describe('update', () => {
    test('method update with existing id and valid data', async () => {
      prismaService.consulta.count = jest.fn().mockResolvedValue(1);
      prismaService.consulta.update = jest.fn().mockResolvedValue(updateConsulta[0]);


      const result = await consultaService.update(1, updateConsulta[0]);

      expect(result).toEqual(updateConsulta[0]);
    });
    test('method update without existing id and valid data', async () =>{
      const result = await consultaService.update(1, updateConsulta[0]);

      expect(result).toThrow;
    });
  });

  describe('delete', () => {
    test('method delete with existing id', async () => {
      prismaService.consulta.count = jest.fn().mockResolvedValue(1);
      prismaService.consulta.delete = jest.fn().mockResolvedValue(consultaList[0]);

      const result = await consultaService.remove(1);

      expect(result).toEqual(consultaList[0]);
    });
    test('method delete without existing id', async () =>{
      const result = await consultaService.remove(1);

      expect(result).toThrow;
    });
  });

});
