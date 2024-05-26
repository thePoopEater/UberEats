import { IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class LocalCreateDTO {
    
    @IsNotEmpty()
    @IsNumber()
    localAdminId : number;

    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    address : string;
    
    @IsNotEmpty()
    @IsString()
    schedule : string;
    
    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsString()
    category : string;
}
