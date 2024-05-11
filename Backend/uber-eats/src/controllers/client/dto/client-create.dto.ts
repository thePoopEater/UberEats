import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ClientCreateDTO {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}
