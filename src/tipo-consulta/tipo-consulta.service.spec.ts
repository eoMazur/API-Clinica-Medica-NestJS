import { Test, TestingModule } from '@nestjs/testing';
import { TipoConsultaService } from './tipo-consulta.service';

describe('TipoConsultaService', () => {
  let service: TipoConsultaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoConsultaService],
    }).compile();

    service = module.get<TipoConsultaService>(TipoConsultaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
