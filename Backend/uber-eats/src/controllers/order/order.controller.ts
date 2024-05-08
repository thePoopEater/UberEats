import {
  Controller,
  Get,
  Param,
  Put,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from 'src/providers/order/order.service';
import { OrderCreateDTO } from './dto/order-create.dto';
import { OrderResponseDTO } from './dto/order-response.dto';
import { OrderEntity } from 'src/database/entities/order.entity';
import { LocalService } from 'src/providers/local/local.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiBearerAuth()
@ApiTags('Order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(
    private orderService: OrderService,
    private localService: LocalService,
  ) {}

  @Get(':id')
  public async getOrder(@Param('id') order_id: number) {
    const order = await this.orderService.findOrder(order_id);
    return order;
  }

  @Post()
  public async postOrder(
    @Body() new_order: OrderCreateDTO,
  ): Promise<OrderResponseDTO> {
    if (this.orderService.createOrder(new_order)) {
      const response: OrderResponseDTO = {
        data: null,
        statusCode: 200,
        statusDescription: 'Listo',
        error: null,
      };
      return response;
    }
  }
  @Get('/products/:id')
  public async getAllProducts(@Param('id') order_id: number) {
    const result = await this.orderService.findProductsFromOrder(order_id);
    return result;
  }
}
