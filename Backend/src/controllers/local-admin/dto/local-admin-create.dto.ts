import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAdminCreateDTO {

    @IsNotEmpty()
    @IsString()
    name : string;
}