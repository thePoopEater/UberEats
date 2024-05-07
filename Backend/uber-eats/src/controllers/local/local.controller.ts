import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { LocalCreateDTO } from './dto/local-create.dto';
import { LocalResponseDTO } from './dto/local-response.dto';
import { LocalService } from '../../providers/local/local.service';
import { LocalEntity } from 'src/database/entities/local.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ProductService } from 'src/providers/product/product.service';
import { LocalUpdateDTO } from './dto/local-update.dto';
import { UpdateResult } from 'typeorm';
import { OrderService } from 'src/providers/order/order.service';
import { OrderEntity } from 'src/database/entities/order.entity';
import { OrderProductService } from 'src/providers/order-product/order-product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('local')
@Controller('local')
export class LocalController {
  constructor(
    private localService: LocalService,
    private productService: ProductService,
    private orderService: OrderService,
    private orderProductService: OrderProductService,
  ) {}

  // Funcion para guardar un nuevo local en el repositorio de locales, tiene como parametro una peticion BODY de tipo LocalCreateDTO
  // esta a su vez esta compuesto de los siguientes datos : name, address, schedule, description (todos strings)
  @Post()
  public async postLocal(
    @Body() request: LocalCreateDTO,
  ): Promise<LocalResponseDTO> {
    if (request) {
      const newLocal: LocalEntity = new LocalEntity(request);
      this.localService.create(newLocal);
      const response: LocalResponseDTO = {
        data: 'Se creo un usuario',
        statusCode: 200,
        statusDescription: 'Listo',
        error: null,
      } as LocalResponseDTO;

      return response;
    }
  }

  // Esta funcion retorna todos los productos de un local, tiene que como parametro la ID de este local,
  // llama al local service y hace un peticion al repositorio de productos.
  @Get('/products/:id')
  public async getProducts(
    @Param('id') local_id: number,
  ): Promise<ProductEntity[]> {
    const products = this.productService.findAllProductsFromLocal(local_id);
    return products;
  }

  // Esta funcion retorna la informacion de un local(id,nombre,descripcion,horario,dirección), tiene como parametro la ID
  //, llama al local service y hace un peticion.
  @Get(':id')
  public async getInfo(@Param('id') local_id: number): Promise<LocalEntity> {
    const local: Promise<LocalEntity> = this.localService.getLocal(local_id);
    return local;
  }

  // Esta funcion modifica la informacion de un local dado una id, esta informacion actualizada viene como parametro request de tipo LocalUpdateDTO,
  // , llama al repositorio de local y pide actualizar columnas de un registro.
  @Put(':id')
  public async putLocal(
    @Param('id') id_local: number,
    @Body() request: LocalUpdateDTO,
  ): Promise<UpdateResult | LocalResponseDTO> {
    if (Object.keys(request).length == 0) {
      throw new BadRequestException('Viene vacio');
    }
    const serv_response = await this.localService.updateLocal(
      id_local,
      request,
    );
    if (serv_response != undefined) {
      const response: LocalResponseDTO = {
        data: null,
        statusCode: 200,
        statusDescription: 'Listo',
        error: null,
      } as LocalResponseDTO;
      return response;
    }
    return serv_response;
  }

  // Esta funcion retornar todos los locales guardados en el repositorio. Sencillito
  @Get()
  public async getAllLocals(): Promise<LocalEntity[]> {
    return await this.localService.getAllLocals();
  }

  @Get('/orders/:id')
  public async getAllOrders(@Param('id') id: number): Promise<OrderEntity[]> {
    const local = await this.localService.getLocal(id);
    const orders = await this.orderService.findOrdersFromOneLocal(local);
    return orders;
  }
}
