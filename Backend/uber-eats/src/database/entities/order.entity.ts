import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { LocalEntity } from './local.entity';

@Entity({name : 'order'})
export class OrderEntity {
    constructor(private data : Partial<OrderEntity>){
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn()
    order_id : number;

    @Column()
    date : Date;

    @Column()
    state : string;

    @Column()
    address : string;

    @Column()
    pay_method : string;

    @Column()
    amount : number;

    @OneToOne(() => LocalEntity)
    @JoinColumn({name:'local_id'})
    local : LocalEntity;
}