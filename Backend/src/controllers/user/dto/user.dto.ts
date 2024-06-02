import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UserDTO {

    @IsNotEmpty()
    @IsNumber()
    userId : number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName:  string;

    @IsNotEmpty()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString() 
    password : string;

    @IsNotEmpty()
    @IsString()
    role : string;
}
