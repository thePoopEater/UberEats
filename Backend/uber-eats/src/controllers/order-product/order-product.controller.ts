import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { OrderProductService } from 'src/providers/order-product/order-product.service';
import { OrderProductCreateDTO } from './dto/order-product-create.dto';
import { OrderService } from 'src/providers/order/order.service';
import { ProductService } from 'src/providers/product/product.service';
import { OrderProductEntity } from 'src/database/entities/order-products.entity';
import { OrderResponseDTO } from '../order/dto/order-response.dto';

@Controller('order-product')
export class OrderProductController {
    constructor(
        private orderProductService : OrderProductService,
        private orderService : OrderService,
        private productService : ProductService
        ){}

        
    @Post()
    public async postOrderProduct(@Body() new_order_product : OrderProductCreateDTO) {
        const order = await this.orderService.findOrder(new_order_product.order_id);

        const product = await this.productService.findOneProduct(new_order_product.product_id);
        
        if (order && product) {
            const order_product = new OrderProductEntity(new_order_product);
            order_product.order = order;
            order_product.product = product;

            let data = this.orderProductService.saveOrderProduct(order_product);
            
            const response : OrderResponseDTO = { 
                data : data,
                statusCode : 200,
                statusDescription : "Listo",
                error : null
            }
            return response;
        }
        if (order == null)
            throw new NotFoundException('No existe esa orden');
        if (product == null)
            throw new NotFoundException('No existe ese producto');
    }
}
