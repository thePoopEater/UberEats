import { IsDate, IsNotEmpty, IsNumber, IsString, IsOptional} from 'class-validator';

export class OrderProductCreateDTO {
    
    @IsNotEmpty()
    @IsNumber()
    quantity : number;

    @IsOptional()
    @IsString()
    specification : string;

    @IsNotEmpty()
    @IsNumber()
    product_id : number;

    @IsNotEmpty()
    @IsNumber()
    order_id : number;
}