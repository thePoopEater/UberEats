import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,ManyToOne, BeforeInsert, BeforeUpdate} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({name : 'order-product'})
export class OrderProductEntity {
    
    constructor(private data : Partial<OrderProductEntity>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    orderProductId : number;

    @JoinColumn({name:'productId'})
    @ManyToOne(()=> ProductEntity, (product) => product.orderProducts, {cascade:true})
    product : ProductEntity;

    @Column()
    productName: string

    @Column()
    quantity : number;

    @Column()
    specification : string;

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
    @JoinColumn({name:'orderId'})
    order : OrderEntity;

    @BeforeInsert()
    @BeforeUpdate()
    updateProductName() {
        if (this.product) {
            this.productName = this.product.name;
        }
    }
}