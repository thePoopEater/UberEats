import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class RouteCreateDTO {

    @IsNotEmpty()
    @IsString()
    routeId: number;

    @IsNotEmpty()
    @IsString()
    origen : string;

    @IsNotEmpty()
    @IsString() 
    destination : string;

    @IsString()
    distance : number;

    @IsNotEmpty()
    @IsNumber()
    duration : number;
}