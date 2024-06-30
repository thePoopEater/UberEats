import { Controller, Post, Body, NotFoundException, ValidationPipe, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { OrderProductService } from 'src/providers/order-product/order-product.service';
import { OrderProductCreateDTO } from './dto/order-product-create.dto';
import { OrderService } from 'src/providers/order/order.service';
import { ProductService } from 'src/providers/product/product.service';
import { OrderProductEntity } from 'src/database/entities/order-products.entity';
import { OrderResponseDTO } from '../order/dto/order-response.dto';
import { OrderProductResponseDTO } from './dto/order-product-response.dto';

@Controller('orderProduct')
export class OrderProductController {
    constructor(
        private orderProductService : OrderProductService,
        private orderService : OrderService,
        private productService : ProductService
        ){}

        
    @Post()
    public async postOrderProduct(@Body(ValidationPipe) newOrderProduct : OrderProductCreateDTO) {
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


    @Delete(':id')
    public async deleteOrderProduct(@Param('id', ParseIntPipe) idOrderProduct : number, 
    @Body(ValidationPipe) newOrderProduct : OrderProductEntity){
        const orderProduct = await this.orderProductService.getOrderProduct(newOrderProduct.orderProductId);
        if (orderProduct) {
            const data = this.orderProductService.deleteOrderProduct(idOrderProduct);
            if (data != undefined){
            const response : OrderResponseDTO = {
                data : null,
                statusCode : 200,
                statusDescription : "Se ha eliminado el producto de la orden correctamente",
                error : null
                }
                return data;
                }
                
                }
                if (!orderProduct)
                    throw new NotFoundException('No existe ese producto');
                
    } 

    @Put(':id')
    public async updateOrderProduct(@Param('id', ParseIntPipe) idOrderProduct : number,
    @Body(ValidationPipe) newOrderProduct : OrderProductEntity){
        const orderProduct = await this.orderProductService.getOrderProduct(newOrderProduct.orderProductId);
        if (orderProduct) {
            const data = this.orderProductService.updateOrderProduct(idOrderProduct, newOrderProduct);
            if (data != undefined){
                const response : OrderProductResponseDTO = {
                    data : null,
                    statusCode : 200,
                    statusDescription : "Se ha actualizado el producto de la orden correctamente",
                    error : null
                    }
                    return response;
                    }
                    if (!orderProduct)
                        throw new NotFoundException('No existe ese producto');
                    }
                    }
                    
}
