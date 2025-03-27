import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PacienteModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
