import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class IPostClienteRequest {

    @IsNotEmpty()
    @IsString()
    nombre: string;
    @IsNotEmpty()
    @IsString()
    apellido: string;
    @IsNotEmpty()
    @IsString()
    contraseña: string;
}
