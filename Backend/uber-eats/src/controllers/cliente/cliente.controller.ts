import { Controller, Post, Body} from '@nestjs/common';
import { IPostClienteRequest } from './dto/IPostClienteRequest';
import { IPostClienteResponse } from './dto/IPostClienteResponse';

@Controller('cliente')
export class ClienteController {
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

            const newCliente: ClienteEntity={
                nombre: request.nombre,
                apellido: request.apellido,
                contraseña:  request.contraseña,

            } as ClienteEntity;
            await this.clienteService.create(newCliente);
            return response;
    }
}
}