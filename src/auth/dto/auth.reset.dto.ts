import { IsJWT, IsString, MinLength } from "class-validator";
import { ForgetDto } from "./auth.forget.dto";

export class ResetDto {

    @IsString()
    @MinLength(6)
    senha: string;

    @IsJWT()
    token: string;
}