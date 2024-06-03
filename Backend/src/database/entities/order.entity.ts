import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany,ManyToOne} from 'typeorm';
import { LocalEntity } from './local.entity';
import { OrderProductEntity } from './order-products.entity';
import { ClientEntity } from './client.entity';

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

    @ManyToOne(() => ClientEntity, (client) => client.orders)
    @JoinColumn({name:'clientId'})
    client: ClientEntity;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    @JoinColumn({name:'orderId'})
    orderProducts : OrderProductEntity[];
}