import { IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class LocalCreateDTO {
    
    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    address : string;
    
    @IsString()
    schedule : string;
    
    @IsString()
    description : string;
}
