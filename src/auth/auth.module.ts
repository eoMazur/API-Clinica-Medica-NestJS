import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PacienteModule } from "src/paciente/paciente.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
        secret: '0123456789-0123456789-0123456789'
    }),
    PacienteModule,
    PrismaModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}