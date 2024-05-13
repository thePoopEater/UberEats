import {IsOptional, IsString, IsNumber} from 'class-validator'

export class ProductUpdateDTO {
    
    @IsOptional()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    description : string;

    @IsOptional()
    @IsString()
    ingredients : string;

    @IsOptional()
    @IsString()
    images : string;

    @IsOptional()
    @IsNumber()
    price : number;


}