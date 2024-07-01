import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany,ManyToOne} from 'typeorm';
import { LocalEntity } from './local.entity';
import { OrderProductEntity } from './order-products.entity';
import { UserEntity } from './user.entity';
import { DeliveryEntity } from './delivery.entity';

@Entity({name :'order'})
export class OrderEntity {
    constructor(private data : Partial<OrderEntity>){
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn()
    orderId : number;

    @Column()
    date : Date;

    @Column()
    state : string;

    @Column()
    address : string;

    @Column()
    payMethod : string;

    @Column()
    amount : number;

    @ManyToOne(() => (LocalEntity),(local) => local.id)
    @JoinColumn({name:'localId'})
    local : LocalEntity;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({name:'userId'})
    user: UserEntity;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    @JoinColumn({name:'orderId'})
    orderProducts : OrderProductEntity[];

    @ManyToOne(() => DeliveryEntity, (delivery) => delivery.deliveryId)
    @JoinColumn({name: 'deliveryId'})
    delivery : DeliveryEntity;
}