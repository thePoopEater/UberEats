import {IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName:  string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: Role;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}