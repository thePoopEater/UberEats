import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name : 'products'})
export class ProductEntity {
    constructor(private data : Partial<ProductEntity>){
        Object.assign(this.data);
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

}