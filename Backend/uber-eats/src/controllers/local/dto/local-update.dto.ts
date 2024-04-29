import { IsOptional, IsString} from 'class-validator';

export class LocalUpdateDTO{

    @IsOptional()
    @IsString()
    name : string;
    
    @IsOptional()
    @IsString()
    address : string;
    
    @IsOptional()
    @IsString()
    schedule : string;
    
    @IsOptional()
    @IsString()
    description : string;

    @IsOptional()
    @IsString()
    category : string;

}