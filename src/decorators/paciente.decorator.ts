import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const DadosPaciente = createParamDecorator((filter: string, context: ExecutionContext) =>{

    const request = context.switchToHttp().getRequest();



    if(request.paciente){
        if(filter){
            return request.paciente[filter];
        }
        else{
            return request.paciente;
        }
    }
    else{
        throw new NotFoundException('Usuário não encontrado no Request. Use o AuthGuard para obter o usuário');
    }
})