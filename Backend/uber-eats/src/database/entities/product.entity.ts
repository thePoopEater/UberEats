import { Entity, PrimaryGeneratedColumn,ManyToOne ,Column, JoinColumn} from 'typeorm';
import { LocalEntity } from './local.entity';

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

    //NOTE:Esta es para hacer la foreing key de local con producto
    @ManyToOne(() => LocalEntity, (local) => local.products)
    @JoinColumn({name: 'local_id'})
    local : LocalEntity;
}