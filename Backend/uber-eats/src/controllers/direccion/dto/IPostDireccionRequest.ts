import {IsNotEmpty, IsNumber, IsString} from "class-validator";
export class IPostDireccionRequest {
    @IsNotEmpty()
    @IsNumber()
    cliente_id: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;
}
