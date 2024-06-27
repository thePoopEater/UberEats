import {IsNotEmpty, IsNumber, IsString} from "class-validator";
export class AddressCreateDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
