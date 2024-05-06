import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ClientCreateDTO {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    
    last_name: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}
