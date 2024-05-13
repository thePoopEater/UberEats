import { IsNotEmpty, IsString} from 'class-validator';


export class LocalCreateDTO {
    
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
