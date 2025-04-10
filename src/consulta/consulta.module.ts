import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuarioIdCheckMiddleware } from '../middlewares/usuario-id-check.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuarioModule],
  controllers: [ConsultaController],
  providers: [ConsultaService],
})
export class ConsultaModule {
  configure(consumer: MiddlewareConsumer) {
        consumer.apply(UsuarioIdCheckMiddleware).forRoutes({
          path:'consultas/:id',
          method: RequestMethod.ALL
        });
      }
}
