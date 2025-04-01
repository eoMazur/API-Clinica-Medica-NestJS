import { BadRequestException, Body, Controller, Headers, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { LoginDto } from "./dto/auth.login.dto";
import { RegisterDto } from "./dto/auth.register.dto";
import { ForgetDto } from "./dto/auth.forget.dto";
import { ResetDto } from "./dto/auth.reset.dto";
import { AuthService } from "./auth.service";
import { UsuarioService } from "src/usuario/usuario.service";
import { AuthGuard } from "src/guards/auth.guard";
import { DadosUsuario } from "src/decorators/usuario.decorator";
import { ThrottlerGuard } from "@nestjs/throttler";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from 'fs/promises'
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly fileService: FileService,
        private readonly authService: AuthService
    ){}


    @Post('login')
    async login(@Body() {email, senha}: LoginDto){
        return this.authService.login(email, senha);
    }

    @Post('register')
    async register(@Body() body: RegisterDto){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: ForgetDto){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {senha, token}: ResetDto){
        return this.authService.reset(senha, token);
    }

    @Post('check')
    async check(@Headers('authorization') token: string){
        return this.authService.checkToken((token ?? '').split(' ')[1]);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@DadosUsuario('email') usuarioEmail){
        return {usuarioEmail}
    }


    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async photo(@DadosUsuario() usuario, @UploadedFile() arquivo: Express.Multer.File){

        const path = join(__dirname,'..', '..', 'storage', 'photos', `photo-${usuario.id}.png`);

        try{
            await this.fileService.upload(arquivo, path);
        }
        catch(e){
            throw new BadRequestException(e);
        }

        return {sucess: true};
    }


}