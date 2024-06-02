import {IsNotEmpty, IsNumber} from "class-validator";
import { RegisterDTO } from "src/auth/dto/register.dto";
import { AddressEntity } from "src/database/entities/address.entity";
import { OrderEntity } from "src/database/entities/order.entity";


export class ClientCreateDTO extends RegisterDTO{

    @IsNotEmpty()
    @IsNumber()
    userId: string

    addresses: AddressEntity[]; 

    orders :  OrderEntity[];

    constructor(data?: Partial<ClientCreateDTO>) {
        super();
        if (data) {
          Object.assign(this, data);
        }

}
    

}
