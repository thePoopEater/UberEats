import {IsNotEmpty, IsString} from "class-validator";

export class DeliveryCreateDTO {
    
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}
