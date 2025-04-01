import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/auth.register.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    private expireTime = '30 minutes';
    private issuer = 'ProjetoNest';
    private audience = 'USUARIOS';

    constructor(private readonly jwtService: JwtService,
         private readonly prisma: PrismaService,
        private readonly usuarioService: UsuarioService){}

    async createToken(usuario: Usuario){
        return {
            token: this.jwtService.sign({
                sub: usuario.id,
                name: usuario.nome,
                email: usuario.email,
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
        const usuario = await this.prisma.usuario.findFirst({
            where: {
                email: email
            }
        });

        if(!usuario){
            throw new ForbiddenException('E-mail e/ou senha incorretos');
        }

        if(!await bcrypt.compare(senha, usuario.senha)){
            throw new ForbiddenException('E-mail e/ou senha incorretos');
        }

        return this.createToken(usuario);
    }

    async forget(email: string){

        const usuario = await this.prisma.usuario.findFirst({
            where: {
                email: email
            }
        })

        if(!usuario){
            throw new ForbiddenException('E-mail e/ou senha incorretos');
        }

        return true;
    }

    async reset(senha: string, token: string){


        //Validar Token

        const id = 0;

       const usuario = await this.prisma.usuario.update({
            where: {
                id
            },
            data: {
                senha: senha
            }
        })

        return this.createToken(usuario);
    }
    
    async register(data: RegisterDto){
       return await this.usuarioService.createUsuario(data);
    }

}