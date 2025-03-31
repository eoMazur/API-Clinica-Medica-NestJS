import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}


    canActivate(context: ExecutionContext) {

        const requeriedRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        console.log({requeriedRoles});

        if(!requeriedRoles){
            return true;
        }

        const {usuario} = context.switchToHttp().getRequest();

        const rolesFilted = requeriedRoles.filter(role => role === usuario.cargo);

        return rolesFilted.length > 0;
    }
    
}