import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PacienteIdCheckMiddleware } from 'src/middlewares/usuario-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class PacienteModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
      consumer.apply(PacienteIdCheckMiddleware).forRoutes({
        path:'pacientes/:id',
        method: RequestMethod.ALL
      });
    }
}
