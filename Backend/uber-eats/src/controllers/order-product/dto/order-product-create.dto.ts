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
    productId : number;

    @IsNotEmpty()
    @IsNumber()
    orderId : number;
}