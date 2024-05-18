import {Controller,Get,Param,Put,Post,Body,NotFoundException} from '@nestjs/common';
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

@Controller('order')
@ApiBearerAuth()
@ApiTags('Order')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private localService: LocalService,
  ) {}

    @Roles('admin')
    @Get(':id')
    public async getOrder(@Param('id') orderId : number)  {
        const order = await this.orderService.findOrder(orderId);
        return order;
    }

    @Post()
    public async postOrder(@Body() newOrder : OrderCreateDTO) : Promise<OrderResponseDTO> {
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
    public async getAllProducts(@Param('id') orderId : number){ 
        const result = await this.orderService.findProductsFromOrder(orderId);
        return result;
    }
  }
