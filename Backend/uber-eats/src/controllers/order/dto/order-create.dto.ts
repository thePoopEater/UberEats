import { IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class OrderCreateDTO {

    @IsNotEmpty()
    @IsNumber()
    local_id : number;

    @IsNotEmpty()
    @IsString()
    date : string;

    @IsNotEmpty()
    @IsString() 
    state : string;

    @IsNotEmpty()
    @IsString()
    address : string;

    @IsNotEmpty()
    @IsString()
    pay_method : string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;
}