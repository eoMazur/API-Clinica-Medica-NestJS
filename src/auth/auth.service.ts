import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Paciente } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/auth.register.dto";
import { PacienteService } from "src/usuario/usuario.service";

@Injectable()
export class AuthService{

    private expireTime = '30 minutes';
    private issuer = 'ProjetoNest';
    private audience = 'PACIENTES';

    constructor(private readonly jwtService: JwtService,
         private readonly prisma: PrismaService,
        private readonly pacienteService: PacienteService){}

    async createToken(paciente: Paciente){
        return {
            token: this.jwtService.sign({
                sub: paciente.id,
                name: paciente.nome,
                email: paciente.email,
            },
            {
               expiresIn: this.expireTime,
               issuer: this.issuer,
               audience: this.audience 
            }
            )
        };
    }

    checkToken(token: string){
        try{
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer
            })

            return data;
        }
        catch(e){
            throw new BadRequestException(e);
        }
        
    }

    isValidToken(token: string){
        try{
            this.checkToken(token);
            return true;
        }
        catch(e){
            return false;
        }
    }

    async login(email: string, senha: string){
        const paciente = await this.prisma.paciente.findFirst({
            where: {
                email: email,
                senha: senha
            }
        });

        if(!paciente){
            throw new ForbiddenException('E-mail e/ou senha incorretos');
        }

        return this.createToken(paciente);
    }

    async forget(email: string){

        const paciente = await this.prisma.paciente.findFirst({
            where: {
                email: email
            }
        })

        if(!paciente){
            throw new ForbiddenException('E-mail e/ou senha incorretos');
        }

        return true;
    }

    async reset(senha: string, token: string){


        //Validar Token

        const id = 0;

       const paciente = await this.prisma.paciente.update({
            where: {
                id
            },
            data: {
                senha: senha
            }
        })

        return this.createToken(paciente);
    }
    
    async register(data: RegisterDto){
        this.pacienteService.create(data);
    }

}