import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryEntity } from 'src/database/entities/delivery.entity';
import { DeliveryService } from 'src/providers/delivery/delivery.service';
import { DeliveryCreateDTO } from './dto/delivery-create.dto';
import { DeliveryResponseDTO } from './dto/delivery-response.dto';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(
        private readonly deliveryService: DeliveryService,
    ){}

    @Post()
    async postDeliveryMan(@Body() request: DeliveryCreateDTO): Promise <DeliveryResponseDTO> {
        let response: DeliveryResponseDTO = {
            data: HttpStatus.OK,
            statusCode:200,
            statusDescription:"Cliente Agregado",
        };
        if (request) {
            const newDeliveryMan: DeliveryEntity = {
                username: request.username,
                password:  request.password
            } as DeliveryEntity;

            try {
                await this.deliveryService.create(newDeliveryMan);
                return response;
            } catch (error : any) {
                response = {
                    data: HttpStatus.BAD_REQUEST,
                    statusCode: 400,
                    statusDescription: "Petición mal recibida"
                }
                throw new BadRequestException(response)
            }
        }
    }

    @Get()
    public async getAllDeliverys() : Promise<DeliveryEntity[]>{
        try {
            return await this.deliveryService.getAllDelivery();

        } catch (error : any) {
            let response: DeliveryResponseDTO = {
                data: HttpStatus.GATEWAY_TIMEOUT,
                statusCode: 504,
                statusDescription: "Tiempo de espera excedido"
            };
            throw new BadRequestException(response)
        }
    }
    //Función que retorna un cliente por ID.
    @Get(':id')
    public async getDeliveryMan(@Param('id') deliveryId : number) : Promise<DeliveryEntity> {
        try {
            const deliveryMan : Promise<DeliveryEntity> = this.deliveryService.getDelivery(deliveryId);
            return deliveryMan;
        } catch (error : any) {
            let response: DeliveryResponseDTO = {
                data: HttpStatus.NOT_FOUND,
                statusCode: 404,
                statusDescription: "Repartidor no encontrado"
            };
            throw new BadRequestException(response)
        }
    }
}
