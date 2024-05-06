import { Controller, Post, Body, Get, Param} from '@nestjs/common';
import { ClientCreateDTO } from './dto/client-create.dto';
import { ClientResponseDTO } from './dto/client-response.dto';
import { ClientEntity } from  'src/database/entities/client.entity';
import { ClientService } from 'src/providers/client/client.service';
import { OrderService } from 'src/providers/order/order.service';
import { OrderEntity } from 'src/database/entities/order.entity';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly orderService : OrderService
        ) {}
//función que permite crear un cliente en la Base de datos, tiene como parámetro el request
//del dto IPostClienteRequest y devuelve una respuesta de acuerdo al statuscode.
//Si se acepta el request se crea el objeto cliente en la base de datos, con su id, nombre,
//apellido y contraseña.

    @Post()
    async postClient(@Body() request: ClientCreateDTO): Promise <ClientResponseDTO> {
        const response: ClientResponseDTO = {
            data: null,
            statusCode:200,
            statusDescription:"Cliente Agregado",
            error: null
        };

        if (request) {
            const new_client: ClientEntity = {
                name: request.name,
                last_name: request.last_name,
                password:  request.password,

            } as ClientEntity;
            await this.clientService.create(new_client);
            return response;
        }
    }

    @Get('/order/:id')
    public async getOrders(@Param('id') client_id : number) : Promise<OrderEntity[]>{
        return await this.orderService.findOrdersFromOneClient(client_id);
    }
}