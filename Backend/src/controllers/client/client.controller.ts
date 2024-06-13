import { Controller, Post, Body, Get, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ClientCreateDTO } from './dto/client-create.dto';
import { ClientResponseDTO } from './dto/client-response.dto';
import { ClientEntity } from 'src/database/entities/client.entity';
import { ClientService } from 'src/providers/client/client.service';
import { OrderService } from 'src/providers/order/order.service';
import { OrderEntity } from 'src/database/entities/order.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';

@Controller('client')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiTags('Client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly orderService: OrderService,
  ) {}
  //función que permite crear un cliente en la Base de datos, tiene como parámetro el request
  //del dto IPostClienteRequest y devuelve una respuesta de acuerdo al statuscode.
  //Si se acepta el request se crea el objeto cliente en la base de datos, con su id, nombre,
  //apellido y contraseña.

    @Post()
    async postClient(@Body(ValidationPipe) request: ClientCreateDTO): Promise <ClientResponseDTO> {
        const response: ClientResponseDTO = {
            data: null,
            statusCode:200,
            statusDescription:"Cliente Agregado",
            error: null
        };
        if (request) {
            const newClient: ClientEntity = {
            } as ClientEntity;
            await this.clientService.create(newClient);
            return response;
        }
    }

    @Get()
    public async getAllClients() : Promise<ClientEntity[]>{
        return await this.clientService.getAllClients();
    }
    //Función que retorna un cliente por ID.
    @Roles(Role.CLIENT)
    @Get(':id')
    public async getClient(@Param('id', ParseIntPipe) clientId : number) : Promise<ClientEntity> {
        const client : Promise<ClientEntity> = this.clientService.getClient(clientId);
        return client;
    }

    @Roles(Role.CLIENT)
    @Get('/order/:id')
    public async getOrders(@Param('id', ParseIntPipe) clientId : number) : Promise<OrderEntity[]>{
        return await this.orderService.findOrdersFromOneClient(clientId);
    }
}
