import { IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class OrderUpdateDTO {

    @IsOptional()
    @IsString() 
    state : string;

    @IsOptional()
    @IsString()
    address : string;

    @IsOptional()
    @IsString()
    payMethod : string;

    @IsOptional()
    @IsNumber()
    amount : number;
}