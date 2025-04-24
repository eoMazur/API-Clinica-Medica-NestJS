import { Test, TestingModule } from '@nestjs/testing';
import { TipoConsultaService } from './tipo-consulta.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaTipoConsultaMock } from '../testing/tipoConsulta/prisma.tipoconsulta-service.mock';
import { createTipoConsulta } from '../testing/tipoConsulta/create-tipoconsulta-dto.mock';
import { tipoConsultaList } from '../testing/tipoConsulta/tipoconsulta-entity-list.mock';
import { PaginacaoDto } from '../paginacao/paginacao.dto';
import { updateConsulta } from '../testing/consultas/update-consulta-dto.mock';
import { updateTipoConsulta } from '../testing/tipoConsulta/update-tipoconsulta-dto.mock';

describe('TipoConsultaService', () => {
  let tipoConsultaService: TipoConsultaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoConsultaService, {
        provide: PrismaService,
        useValue: prismaTipoConsultaMock
      }],
    }).compile();

    prismaService = module.get(PrismaService);

    tipoConsultaService = module.get<TipoConsultaService>(TipoConsultaService);
  });

  it('should be defined', () => {
    expect(tipoConsultaService).toBeDefined();
  });

  describe('create', () => {
    test('method create with valid data', async () => {
        prismaService.tipoConsulta.create = jest.fn().mockResolvedValue(tipoConsultaList[0]);

        const result = await tipoConsultaService.create(createTipoConsulta[0]);

        expect(result).toEqual(tipoConsultaList[0]);
    })
  });

  describe('read', () => {

    test('method findAll with existing TipoConsulta', async () => {
      prismaService.tipoConsulta.findMany = jest.fn().mockResolvedValue(tipoConsultaList);

      let pagina: PaginacaoDto = {
        limit: 10,
        offset: 0
      };

      const result = await tipoConsultaService.findAll(pagina);

      expect(result).toEqual(tipoConsultaList);
    });

    test('method findAll with existing TipoConsulta and PaginacaoDto', async () => {
      prismaService.tipoConsulta.findMany = jest.fn().mockResolvedValue(tipoConsultaList[1]);

      let pagina: PaginacaoDto = {
        limit: 1,
        offset: 1
      };

      const result = await tipoConsultaService.findAll(pagina);

      expect(result).toEqual(tipoConsultaList[1]);
    });

    test('method findOne with existing id', async () => {
      prismaService.tipoConsulta.count = jest.fn().mockResolvedValue(1);
      prismaService.tipoConsulta.findUnique = jest.fn().mockResolvedValue(tipoConsultaList[0]);

      const result = await tipoConsultaService.findOne(1);

      expect(result).toEqual(tipoConsultaList[0]);
    });

    test('method findOne without existing id', async () => {

      const result = await tipoConsultaService.findOne(1);

      expect(result).toThrow;
    });
  });

  describe('update', () => {

    test('method update with existing id and valid data', async () => {
      prismaService.tipoConsulta.count = jest.fn().mockResolvedValue(1);
      prismaService.tipoConsulta.update = jest.fn().mockResolvedValue(tipoConsultaList[0]);

      const result = await tipoConsultaService.update(1, updateTipoConsulta);

      expect(result).toEqual(tipoConsultaList[0]);
    });

    test('method update without existing id', async () => {

      const result = await tipoConsultaService.update(1, updateTipoConsulta);

      expect(result).toThrow;
    });
  });


  describe('delete', () => {
      test('method delete with existing id', async () => {
        prismaService.tipoConsulta.count = jest.fn().mockResolvedValue(1);
        prismaService.tipoConsulta.delete = jest.fn().mockResolvedValue(tipoConsultaList[0]);
  
        const result = await tipoConsultaService.remove(1);
  
        expect(result).toEqual(tipoConsultaList[0]);
      });
      test('method delete without existing id', async () =>{
        const result = await tipoConsultaService.remove(1);
  
        expect(result).toThrow;
      });
    });
});
