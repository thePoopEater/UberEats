import { IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ProductCreateDTO {

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsString()
    ingredients : string;

    @IsString()
    description : string;

    @IsString()
    images : string;
}