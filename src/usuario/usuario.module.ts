import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioIdCheckMiddleware } from 'src/middlewares/usuario-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
      consumer.apply(UsuarioIdCheckMiddleware).forRoutes({
        path:'usuarios/:id',
        method: RequestMethod.ALL
      });
    }
}
