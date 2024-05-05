import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,ManyToOne} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({name : 'order_product'})
export class OrderProductEntity {
    
    constructor(private data : Partial<OrderProductEntity>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @JoinColumn({name:'product_id'})
    @ManyToOne(()=> ProductEntity, (product) => product.order_products, {cascade:true})
    product : ProductEntity;

    @Column()
    quantity : number;

    @Column()
    specification : string;

    @ManyToOne(() => OrderEntity, (order) => order.order_products)
    @JoinColumn({name:'order_id'})
    order : OrderEntity;
}