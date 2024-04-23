import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name : 'local'})
export class LocalEntity {
    constructor(private data : Partial<LocalEntity>){
        Object.assign(this.data);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column( {unique: true} )
    name : string;

    @Column()
    description : string;

    @Column()
    address : string;
    
}