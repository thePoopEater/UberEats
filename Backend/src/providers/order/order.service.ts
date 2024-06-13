import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderCreateDTO } from "src/controllers/order/dto/order-create.dto";
import { LocalEntity } from "src/database/entities/local.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository, UpdateResult } from 'typeorm';
import { LocalService } from "../local/local.service";
import { ClientService } from "../client/client.service";
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>,

        private localService : LocalService,
        private clientService : ClientService
        ) {}

    public findOrder(id : number) : Promise<OrderEntity> {
        return this.orderRepository.findOneBy({orderId:id});
    }
    public async createOrder(order : OrderCreateDTO) : Promise<OrderEntity>{
        const local = await this.localService.getLocal(order.localId);
        const client = await this.clientService.findClient(order.clientId);
        if (local && client){
            const newOrder = new OrderEntity(order);
            newOrder.client = client;
            newOrder.local = local;
            return await this.orderRepository.save(newOrder);
        }
        if (!local) throw new NotFoundException("No existe ese local");
        if (!client) throw new NotFoundException("No existe ese cliente");
        return undefined;
    }
    public async findOrdersFromOneLocal(local: LocalEntity) : Promise<OrderEntity[]> {
        let orders : OrderEntity[] = await this.orderRepository.findBy({'local': local});
        return orders;
    }

    public async findOrdersFromOneClient(clientId : number) {
        const client = await this.clientService.findClient(clientId);
        return this.orderRepository.findBy({client:client});
    }

    public async findProductsFromOrder(id : number){
    return await this.orderRepository.createQueryBuilder('order')
        .innerJoin('order.orderProducts','orderProduct')
        .innerJoin('orderProduct.product','product')
        .where('order.orderId = :id',{id})
        .select('product')
        .addSelect('orderProduct.quantity')
        .addSelect('orderProduct.specification')
        .execute()
    }

    public async getAllOrders():Promise<OrderEntity[]>{
        return this.orderRepository.find();
    }
}