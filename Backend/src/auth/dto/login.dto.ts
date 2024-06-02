import {IsNotEmpty, IsString} from 'class-validator'
export class LoginDTO{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
