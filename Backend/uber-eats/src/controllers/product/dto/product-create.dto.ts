import { IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ProductCreateDTO {

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsString()
    ingredients : string;

    @IsNotEmpty()
    @IsString() 
    description : string;

    @IsString()
    images : string;

    @IsNotEmpty()
    @IsNumber()
    local_id : number;

    @IsNotEmpty()
    @IsNumber()
    price : number;
}