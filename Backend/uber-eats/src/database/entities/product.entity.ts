import { Entity, PrimaryGeneratedColumn,ManyToOne ,Column, JoinColumn,OneToMany, JoinTable} from 'typeorm';
import { LocalEntity } from './local.entity';
import { OrderProductEntity } from './order-products.entity';

@Entity({name : 'product'})
export class ProductEntity {
    constructor(private data : Partial<ProductEntity>){
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    product_id : number;

    @Column()
    name : string;

    @Column()
    ingredients : string;

    @Column()
    description : string;

    @Column()
    images : string;

    @Column()
    price : number;

    //NOTE:Esta es para hacer la foreing key de local con producto
    @ManyToOne(() => LocalEntity, (local) => local.products)
    @JoinColumn({name: 'local_id'})
    local : LocalEntity;

    @OneToMany(()=>OrderProductEntity,(orderProduct) => orderProduct.product)
    order_products : OrderProductEntity[]
}