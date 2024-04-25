import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Direccion } from 'src/database/entities/direccion.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  contraseña: string;

  @OneToMany(()=> Direccion, (direccion) => direccion.cliente)
  direcciones: Direccion[];

}