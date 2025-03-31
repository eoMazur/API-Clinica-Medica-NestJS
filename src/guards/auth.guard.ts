import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UsuarioService } from "src/usuario/usuario.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService
    ){}


    async canActivate(context: ExecutionContext) {
        

        const request = context.switchToHttp().getRequest();

        const {authorization} = request.headers;

        try{
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);


            request.tokenPayLoad = data

            request.usuario = await this.usuarioService.findOne(data.sub);

            return true;
        }
        catch(e){
            return false;
        }


    }

}