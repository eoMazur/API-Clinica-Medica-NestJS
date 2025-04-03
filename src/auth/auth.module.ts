import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsuarioModule } from "src/usuario/usuario.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [
        JwtModule.register({
        secret: process.env.JWT_SECRET

    }),
    forwardRef(() => UsuarioModule),
    PrismaModule,
    FileModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}