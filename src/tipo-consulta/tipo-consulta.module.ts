import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TipoConsultaService } from './tipo-consulta.service';
import { TipoConsultaController } from './tipo-consulta.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioIdCheckMiddleware } from '../middlewares/usuario-id-check.middleware';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuarioModule],
  controllers: [TipoConsultaController],
  providers: [TipoConsultaService],
})
export class TipoConsultaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsuarioIdCheckMiddleware).forRoutes({
      path:'tipoconsultas/:id',
      method: RequestMethod.ALL
    });
  }
}
