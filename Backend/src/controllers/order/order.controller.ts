import {Controller,Get,Param,Put,Post,Body,NotFoundException, ValidationPipe, ParseIntPipe, Delete} from '@nestjs/common';
import { OrderService } from 'src/providers/order/order.service';
import { OrderCreateDTO } from './dto/order-create.dto';
import { OrderResponseDTO } from './dto/order-response.dto';
import { OrderEntity } from 'src/database/entities/order.entity';
import { LocalService } from 'src/providers/local/local.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';

@Controller('order')
@ApiBearerAuth()
@ApiTags('Order')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderController {
  constructor(
    private orderService: OrderService,
    private localService: LocalService,
  ) {}

    @Get(':id')
    public async getOrder(@Param('id') orderId : number)  {
        const order = await this.orderService.findOrder(orderId);
        return order;
    }

    @Get()
    public async getAllOrder(): Promise<OrderEntity[]> {
      return await this.orderService.getAllOrders();
    }

    @Post()
    @Roles(Role.CLIENT)
    public async postOrder(@Body(ValidationPipe) newOrder : OrderCreateDTO) : Promise<OrderResponseDTO> {
        if (this.orderService.createOrder(newOrder)){
            const response : OrderResponseDTO = {
                data : null,
                statusCode : 200,
                statusDescription : "Listo",
                error : null
            };
            return response;   
        }
               
    }
    @Get('/products/:id')
    public async getAllProducts(@Param('id', ParseIntPipe) orderId : number){ 
        const result = await this.orderService.findProductsFromOrder(orderId);
        return result;
    }

    //devuelve todas las ordenes de un cliente
    @Get('/client/:id')
    public async getAllOrdersFromClient(@Param('id', ParseIntPipe) clientId : number){
      const result = await this.orderService.findOrdersFromOneClient(clientId);
      return result;
    } 

    @Put(':id')
    public async updateOrder(@Param('id', ParseIntPipe) idOrder : number,
    @Body(ValidationPipe) newOrder : OrderEntity){
      const order = await this.orderService.findOrder(newOrder.orderId);
      if (!order){
        throw new NotFoundException('No existe esa orden');
    }
      if (order){
        const result = await this.orderService.updateOrder(idOrder, newOrder);
        if(result != undefined){
          const response: OrderResponseDTO = {
            data : null,
            statusCode : 200,
            statusDescription : "La orden se actualizó correctamente",
            error : null
            }
            return response;
          }
          }
    }

    @Delete(':id')
    public async deleteOrder(@Param('id', ParseIntPipe) idOrder : number){
      const order = await this.orderService.findOrder(idOrder);
      if (!order){
        throw new NotFoundException('No existe esa orden');
      }
      if (order){
        const result = await this.orderService.deleteOrder(idOrder);
        if(result != undefined){
          const response: OrderResponseDTO = {
            data : null,
            statusCode : 200,
            statusDescription : "La orden se eliminó correctamente",
            error : null
            }
            return response;
            }
            }
  }
}
