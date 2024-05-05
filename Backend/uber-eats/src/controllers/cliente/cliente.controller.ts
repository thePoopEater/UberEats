import { Controller, Post, Body} from '@nestjs/common';
import { IPostClienteRequest } from './dto/IPostClienteRequest';
import { IPostClienteResponse } from './dto/IPostClienteResponse';
import { Cliente } from  'src/database/entities/cliente.entity';
import { ClienteService } from 'src/providers/cliente/cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly ClienteService: ClienteService) {}
//función que permite crear un cliente en la Base de datos, tiene como parámetro el request
//del dto IPostClienteRequest y devuelve una respuesta de acuerdo al statuscode.
//Si se acepta el request se crea el objeto cliente en la base de datos, con su id, nombre,
//apellido y contraseña.

    @Post()
    async postCliente(@Body() request: IPostClienteRequest): Promise <IPostClienteResponse> {
        console.log('@POST');
        const response: IPostClienteResponse = {
            data: null,
            statusCode:200,
            statusDescription:"Cliente Agregado",
            error: null

        };
        if  (request) {

            const newCliente: Cliente={
                nombre: request.nombre,
                apellido: request.apellido,
                contraseña:  request.contraseña,

            } as Cliente;
            await this.ClienteService.create(newCliente);
            return response;
    }
}
}