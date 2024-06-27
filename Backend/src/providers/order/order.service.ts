import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderCreateDTO } from "src/controllers/order/dto/order-create.dto";
import { LocalEntity } from "src/database/entities/local.entity";
import { OrderEntity } from "src/database/entities/order.entity";
import { Repository } from 'typeorm';
import { LocalService } from "../local/local.service";
import { UserService } from "../user/user.service";
import { Role } from "src/auth/enums/role.enum";
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>,

        private localService : LocalService,
        private userService : UserService
        ) {}

    public findOrder(id : number) : Promise<OrderEntity> {
        return this.orderRepository.findOneBy({orderId:id});
    }
    public async createOrder(order: OrderCreateDTO): Promise<OrderEntity> {
        const local = await this.localService.getLocal(order.localId);
        
        const user = await this.userService.findUserByIdAndRole(order.userId, Role.CLIENT);

        if (local && user) {
            const newOrder = new OrderEntity(order);
            newOrder.user = user;
            newOrder.local = local;

            return await this.orderRepository.save(newOrder);
        }

        if (!local) {
            throw new NotFoundException("No existe ese local");
        }
        if (!user) {
            throw new NotFoundException("No existe ese cliente");
        }
    }

    public async findOrdersFromOneLocal(local: LocalEntity) : Promise<OrderEntity[]> {
        let orders : OrderEntity[] = await this.orderRepository.findBy({'local': local});
        return orders;
    }

    public async findOrdersFromOneClient(userId : number) {
        const user = await this.userService.findClient(userId);
        return this.orderRepository.findBy({user:user});
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