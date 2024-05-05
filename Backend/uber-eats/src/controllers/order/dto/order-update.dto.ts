import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class OrderUpdateDTO {

    @IsOptional()
    @IsString() 
    state : string;

    @IsNotEmpty()
    @IsString()
    address : string;

    @IsOptional()
    @IsString()
    pay_method : number;

    @IsOptional()
    @IsNumber()
    amount : number;
}