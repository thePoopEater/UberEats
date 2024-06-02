import {IsNotEmpty, IsString} from 'class-validator';
import { AddressEntity } from 'src/database/entities/address.entity'; //nuevo
import { OrderEntity } from 'src/database/entities/order.entity'; //nuevo

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName:  string;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    //solo para users con rol 'client'
    addresses?: AddressEntity[]; 
    orders? :  OrderEntity[];

}