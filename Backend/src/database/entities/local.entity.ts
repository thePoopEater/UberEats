import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { LocalAdminEntity } from './local-admin.entity';

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

    @ManyToOne(()=>(LocalAdminEntity), (localAdmin)=> localAdmin.locals)
    @JoinColumn({ name: 'localAdminId' })
    localAdmin: LocalAdminEntity; 

}
