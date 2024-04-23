import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  horario: string;

  @Column()
    tarifa_base: number;

  @Column()
    dirección: string;

  @Column()
    categoría: string;
    
  @Column()
    calificacion_total: number;

}
