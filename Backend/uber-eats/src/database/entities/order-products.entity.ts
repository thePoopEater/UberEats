import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,ManyToOne} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({name : 'order-product'})
export class OrderProductEntity {
    
    constructor(private data : Partial<OrderProductEntity>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @JoinColumn({name:'productId'})
    @ManyToOne(()=> ProductEntity, (product) => product.orderProducts, {cascade:true})
    product : ProductEntity;

    @Column()
    quantity : number;

    @Column()
    specification : string;

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
    @JoinColumn({name:'orderId'})
    order : OrderEntity;
}