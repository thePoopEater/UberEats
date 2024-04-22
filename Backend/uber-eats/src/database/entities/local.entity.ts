import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'local'})
export class Local{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fnombre: string
}