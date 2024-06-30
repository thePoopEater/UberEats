import { IsNumber, IsOptional, IsString } from "class-validator";

export class OrderProductUpdateDTO {

    @IsOptional()
    @IsNumber() 
    quantity : number;

    @IsOptional()
    @IsString()
    specification : string;
}