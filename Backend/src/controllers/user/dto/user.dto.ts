import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UserDTO {

    @IsNotEmpty()
    @IsNumber()
    userId : number;

    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsString() 
    password : string;

    @IsNotEmpty()
    @IsString()
    role : string;
}
