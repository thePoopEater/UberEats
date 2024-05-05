import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({name : 'local'})
export class LocalEntity {
    constructor(private data : Partial<LocalEntity>){
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column( {unique: true} )
    name : string;

    @Column()
    description : string;

    @Column()
    address : string;

    @Column()
    schedule : string;

    @Column()
    category : string;

    @OneToMany(()=>(OrderEntity),(order)=>order.local)
    orders : OrderEntity[]

    @OneToMany(() => ProductEntity, (product) => product.local)
    products : ProductEntity[]

}