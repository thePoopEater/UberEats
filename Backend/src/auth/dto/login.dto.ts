import {IsNotEmpty, IsString, IsEmail} from 'class-validator'
export class LoginDTO{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
