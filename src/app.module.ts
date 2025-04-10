import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule} from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConsultaModule } from './consulta/consulta.module';
import { TipoConsultaModule } from './tipo-consulta/tipo-consulta.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(
      [{
        ttl: 60, 
        limit: 10,
        ignoreUserAgents: [/googlebot/gi]
      }
    ]),
    forwardRef(() => UsuarioModule),
    forwardRef(() => AuthModule),
    ConsultaModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'joel11@ethereal.email',
            pass: 'DVeysKfzpuxpue3F9U'
        }
      },
      defaults: {
        from: '"nest-modules" <joel11@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConsultaModule,
    TipoConsultaModule,
    ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
