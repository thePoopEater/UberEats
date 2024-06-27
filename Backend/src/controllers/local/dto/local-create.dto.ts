import { IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class LocalCreateDTO {
    
    @IsNotEmpty()
    @IsNumber()
    userId : number;

    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    address : string;

    @IsNotEmpty()
    @IsString()
    image : string;

    
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
