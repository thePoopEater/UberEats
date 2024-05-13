import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { OrderProductService } from 'src/providers/order-product/order-product.service';
import { OrderProductCreateDTO } from './dto/order-product-create.dto';
import { OrderService } from 'src/providers/order/order.service';
import { ProductService } from 'src/providers/product/product.service';
import { OrderProductEntity } from 'src/database/entities/order-products.entity';
import { OrderResponseDTO } from '../order/dto/order-response.dto';

@Controller('orderProduct')
export class OrderProductController {
    constructor(
        private orderProductService : OrderProductService,
        private orderService : OrderService,
        private productService : ProductService
        ){}

        
    @Post()
    public async postOrderProduct(@Body() newOrderProduct : OrderProductCreateDTO) {
        const order = await this.orderService.findOrder(newOrderProduct.orderId);

        const product = await this.productService.findOneProduct(newOrderProduct.productId);
        
        if (order && product) {
            const orderProduct = new OrderProductEntity(newOrderProduct);
            orderProduct.order = order;
            orderProduct.product = product;

            let data = this.orderProductService.saveOrderProduct(orderProduct);
            
            const response : OrderResponseDTO = { 
                data : data,
                statusCode : 200,
                statusDescription : "Listo",
                error : null
            }
            return response;
        }
        if (!order)
            throw new NotFoundException('No existe esa orden');
        if (!product)
            throw new NotFoundException('No existe ese producto');
    }
}
