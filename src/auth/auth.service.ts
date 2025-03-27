import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Paciente, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/auth.register.dto";
import { PacienteService } from "src/paciente/paciente.service";
import { CreatePacienteDto } from "src/paciente/dto/create-paciente.dto";

@Injectable()
export class AuthService{

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
               expiresIn: '7 days',
               issuer: 'ProjetoNest',
               audience: 'PACIENTES' 
            }
            )
        };
    }

    async checkToken(token: string){
        try{
            console.log(token);
            const data = this.jwtService.verify(token, {
                audience: "PACIENTES",
                issuer: "ProjetoNest"
            })

            return data;
        }
        catch(e){
            throw new BadRequestException(e);
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