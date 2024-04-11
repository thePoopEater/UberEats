import { Controller, Get, Post, Param, Body, Put, Res } from '@nestjs/common';
import { Request } from 'express';
import { IGetUserResponse } from './dto/IGetUserResponse';
import { IPostUserRequest } from './dto/IPostUserRequest';
import { IPostUserResponse } from './dto/IPostUserResponse';
import { IPutUserResponse } from './dto/IPutUserResponse';
import { IPutUserRequest } from './dto/IPutUserRequest';

@Controller('user')
export class UserController {

    // Variable temporal utilizada para experimentacion de los metodos de la clase UserController
    private users : IGetUserResponse[] = [{
        id : 1,
        name: "Ibar",
        lastname : "Ramirez",
        age : 71

    }]
    // Esta funcion devuelve todos los usuarios que estan registrados en la BD
    // Author: El perro Alday
    @Get()    
    public getAllUsers() : IGetUserResponse[] {
        // FIX: hay que hacerlo con la base de datos!
        return this.users;
    }


    // Esta funcion devuelve el usuario ingresado en el navegador, lo busca con la id
    @Get(':id')
    public getUser(  @Param('id') id : number  ) : IGetUserResponse {
        
        //todo:esto debe ser una query en la base de datos
        const user : IGetUserResponse = this.users.find(
            e => e.id == id
        );
        return user;
    }

    // Esta funcion permite que el usuario pueda ingresar un usuario al backend con la interfaz 
    // IPostUserRequest que tiene como atributos : name, lastname, age
    // Devuelve un response con el codigo 200, si el usuario no se encuentra no envia nada
    @Post()
    public async postUser( @Body() request : IPostUserRequest) : Promise<IPostUserResponse> {

        const response : IPostUserResponse = {
            data : null,
            statusCode : 200,
            statusDescription : 'User added',
            error : null
        };
        // FIX: permite agregar un usuario con una id ya existente CAMBIAR
        if (request) {
            const newUser : IGetUserResponse = {
                id : this.users.length,
                name : request.name,
                lastname : request.lastname,
                age : request.age
            } 
            
            this.users.push(newUser);
            console.log(this.users);
            return response;
        }
    }
    @Put(':id')
    public async putUser() {}
}
