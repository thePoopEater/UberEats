import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProductEntity } from "src/database/entities/order-products.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository } from 'typeorm';
@Injectable()
export class OrderProductService {

    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly orderProductRepository : Repository<OrderProductEntity>
        ) {}
        
    public async saveOrderProduct(order : OrderProductEntity) : Promise<OrderProductEntity> {
        return await this.orderProductRepository.save(order);
    }

    public async getOrderProduct(orderProductId : number) : Promise<OrderProductEntity>{
        return await this.orderProductRepository.findOneBy({orderProductId:orderProductId});
    }

    public async getAllProductsFromOrder(orderId : number) : Promise<OrderProductEntity[]>{
        return this.orderProductRepository.findBy({orderProductId:orderId});
    }

    public async deleteOrderProduct(orderProductId: number) : Promise<OrderProductEntity>{
        const result= await this.orderProductRepository.findOneBy({orderProductId:orderProductId});
        await this.orderProductRepository.remove(result);
        return result;
    }


    
}