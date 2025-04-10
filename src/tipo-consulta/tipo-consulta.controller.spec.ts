import { Test, TestingModule } from '@nestjs/testing';
import { TipoConsultaController } from './tipo-consulta.controller';
import { TipoConsultaService } from './tipo-consulta.service';

describe('TipoConsultaController', () => {
  let controller: TipoConsultaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoConsultaController],
      providers: [TipoConsultaService],
    }).compile();

    controller = module.get<TipoConsultaController>(TipoConsultaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
