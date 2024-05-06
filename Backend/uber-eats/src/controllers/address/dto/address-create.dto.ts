import {IsNotEmpty, IsNumber, IsString} from "class-validator";
export class AddressCreateDTO {
    @IsNotEmpty()
    @IsNumber()
    client_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
