import { Test, TestingModule } from '@nestjs/testing';
import { TipoConsultaController } from './tipo-consulta.controller';
import { TipoConsultaService } from './tipo-consulta.service';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthGuardMock } from '../testing/guards/auth-guard.mock';

describe('TipoConsultaController', () => {
  let controller: TipoConsultaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoConsultaController],
      providers: [TipoConsultaService, {
        provide: AuthGuard,
        useValue: AuthGuardMock
      }, AuthService, UsuarioService],
    }).compile();

    controller = module.get<TipoConsultaController>(TipoConsultaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
