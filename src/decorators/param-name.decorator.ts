import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ParamNome = createParamDecorator((_data: undefined, context: ExecutionContext) =>{

    return String(context.switchToHttp().getRequest().params.nome);
})