import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class OrderCreateDTO {

    @IsNotEmpty()
    @IsNumber()
    localId : number;

    @IsNotEmpty()
    @IsNumber()
    userId : number;

    @IsNotEmpty()
    @IsString()
    date : Date;

    @IsNotEmpty()
    @IsString() 
    state : string;

    @IsNotEmpty()
    @IsString()
    address : string;

    @IsNotEmpty()
    @IsString()
    payMethod : string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;

}