import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({name : 'order_product_entity'})
export class OrderProductEntity {
    
    constructor(private data : Partial<OrderProductEntity>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @JoinColumn({name:'product_id'})
    @OneToOne(()=> ProductEntity)
    product : ProductEntity;

    @Column()
    quantity : number;

    @Column()
    specification : string;

    @OneToOne(() => OrderEntity)
    @JoinColumn({name: 'order_id'})
    order : OrderEntity;
}