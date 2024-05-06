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
    order_id : number;

    @Column()
    date : string;

    @Column()
    state : string;

    @Column()
    address : string;

    @Column()
    pay_method : string;

    @Column()
    amount : number;

    @ManyToOne(() => (LocalEntity),(local) => local.id)
    @JoinColumn({name:'local_id'})
    local : LocalEntity;

    @ManyToOne(() => ClientEntity, (client) => client.orders)
    @JoinColumn({name:'client_id'})
    client: ClientEntity;

    @OneToMany(() => OrderProductEntity, (orderproduct) => orderproduct.order)
    @JoinColumn({name:'order_id'})
    order_products : OrderProductEntity[];
}