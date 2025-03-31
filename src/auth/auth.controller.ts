import { Body, Controller, Headers, Param, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/auth.login.dto";
import { RegisterDto } from "./dto/auth.register.dto";
import { ForgetDto } from "./dto/auth.forget.dto";
import { ResetDto } from "./dto/auth.reset.dto";
import { AuthService } from "./auth.service";
import { PacienteService } from "src/usuario/usuario.service";
import { AuthGuard } from "src/guards/auth.guard";
import { DadosPaciente } from "src/decorators/paciente.decorator";


@Controller('auth')
export class AuthController {

    constructor(private readonly pacienteService: PacienteService,
        private readonly authService: AuthService
    ){}


    @Post('login')
    async login(@Body() {email, senha}: LoginDto){
        return this.authService.login(email, senha);
    }

    @Post('register')
    async register(@Body() body: RegisterDto){
        return this.pacienteService.create(body);
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
    async me(@DadosPaciente('email') pacienteEmail){
        return {pacienteEmail}
    }


}