import {IsNotEmpty, IsString} from 'class-validator';
import { AddressEntity } from 'src/database/entities/address.entity'; //nuevo
import { OrderEntity } from 'src/database/entities/order.entity'; //nuevo

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    //solo para users con rol 'client'
    name?: string;
    lastName?:  string;
    addresses?: AddressEntity[]; 
    orders? :  OrderEntity[];

}