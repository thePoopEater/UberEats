import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProductEntity } from "../../database/entities/order-products.entity";
import { OrderEntity } from "../../database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
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
        return await this.orderProductRepository.findOneBy({id:orderProductId});
    }

    public async getAllProductsFromOrder(orderId : number) : Promise<OrderProductEntity[]>{
        return this.orderProductRepository.findBy({id:orderId});
    }

    
}