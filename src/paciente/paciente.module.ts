import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PacienteIdCheckMiddleware } from 'src/middlewares/paciente-id-check.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService],
})
export class PacienteModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
      consumer.apply(PacienteIdCheckMiddleware).forRoutes({
        path:'pacientes/:id',
        method: RequestMethod.ALL
      });
    }
}
