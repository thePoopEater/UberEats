import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Local{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fnombre: string
}